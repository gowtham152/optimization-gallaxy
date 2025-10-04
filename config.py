import os

class Config:
    MYSQL_HOST = os.getenv('MYSQL_HOST', 'localhost')
    MYSQL_PORT = int(os.getenv('MYSQL_PORT', 3306))
    MYSQL_USER = os.getenv('MYSQL_USER', 'root')
    MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD', 'root')
    MYSQL_DB = os.getenv('MYSQL_DB', 'optimization_db')
    SECRET_KEY = os.getenv('SECRET_KEY', 'optimization-galaxy-secret-key-2024')

# Test if the class is properly defined
if __name__ == '__main__':
    config = Config()
    print("✅ Config class is working!")
    print(f"MySQL User: {config.MYSQL_USER}")
    print(f"MySQL Password: {config.MYSQL_PASSWORD}")