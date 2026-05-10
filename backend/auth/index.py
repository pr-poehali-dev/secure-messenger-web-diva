import json
import os
import hashlib
import psycopg2

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def handler(event: dict, context) -> dict:
    """
    Регистрация и вход пользователей web-Diva.
    Поддерживает: action=register (login, password, name) и action=login (login, password).
    """
    method = event.get('httpMethod', 'GET')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }

    try:
        body = json.loads(event.get('body') or '{}')
    except Exception:
        body = {}

    action = body.get('action', '')
    login = (body.get('login') or '').strip().lower()
    password = body.get('password') or ''
    name = (body.get('name') or '').strip()

    if not login or not password:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Логин и пароль обязательны'})
        }

    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()

    try:
        login_safe = login.replace("'", "''")
        password_hash = hash_password(password)

        if action == 'register':
            if not name:
                return {
                    'statusCode': 400,
                    'headers': {**cors_headers, 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Введите имя'})
                }

            cur.execute(f"SELECT id FROM users WHERE login = '{login_safe}'")
            if cur.fetchone():
                return {
                    'statusCode': 409,
                    'headers': {**cors_headers, 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Пользователь уже существует'})
                }

            name_safe = name.replace("'", "''")
            cur.execute(
                f"INSERT INTO users (login, password, name) VALUES ('{login_safe}', '{password_hash}', '{name_safe}') RETURNING id, login, name, is_premium"
            )
            row = cur.fetchone()
            conn.commit()
            return {
                'statusCode': 200,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'body': json.dumps({
                    'success': True,
                    'user': {
                        'id': row[0],
                        'login': row[1],
                        'name': row[2],
                        'is_premium': row[3]
                    }
                })
            }

        elif action == 'login':
            cur.execute(
                f"SELECT id, login, name, is_premium, password FROM users WHERE login = '{login_safe}'"
            )
            row = cur.fetchone()
            if not row or row[4] != password_hash:
                return {
                    'statusCode': 401,
                    'headers': {**cors_headers, 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Неверный логин или пароль'})
                }
            return {
                'statusCode': 200,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'body': json.dumps({
                    'success': True,
                    'user': {
                        'id': row[0],
                        'login': row[1],
                        'name': row[2],
                        'is_premium': row[3]
                    }
                })
            }

        elif action == 'premium':
            user_id = body.get('user_id')
            if not user_id:
                return {
                    'statusCode': 400,
                    'headers': {**cors_headers, 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'user_id required'})
                }
            uid = int(user_id)
            cur.execute(f"UPDATE users SET is_premium = TRUE WHERE id = {uid} RETURNING id, login, name, is_premium")
            row = cur.fetchone()
            conn.commit()
            if not row:
                return {
                    'statusCode': 404,
                    'headers': {**cors_headers, 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Пользователь не найден'})
                }
            return {
                'statusCode': 200,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'body': json.dumps({
                    'success': True,
                    'user': {'id': row[0], 'login': row[1], 'name': row[2], 'is_premium': row[3]}
                })
            }

        else:
            return {
                'statusCode': 400,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Unknown action'})
            }

    finally:
        cur.close()
        conn.close()
