import mysql.connector
from config import Config
import os

def init_database():
    try:
        # Connect to MySQL server
        conn = mysql.connector.connect(
            host=Config.MYSQL_HOST,
            port=Config.MYSQL_PORT,
            user=Config.MYSQL_USER,
            password=Config.MYSQL_PASSWORD
        )
        cursor = conn.cursor()
        
        # Create database
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {Config.MYSQL_DB}")
        cursor.execute(f"USE {Config.MYSQL_DB}")
        
        # Create tables
        tables = [
            """
            CREATE TABLE IF NOT EXISTS problems (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                type ENUM('tsp', 'knapsack', 'matching') NOT NULL,
                dataset_path VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS algorithm_runs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                problem_id INT,
                algorithm_name VARCHAR(100) NOT NULL,
                parameters JSON,
                solution JSON,
                objective_value FLOAT,
                execution_time FLOAT,
                memory_used FLOAT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (problem_id) REFERENCES problems(id)
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS performance_metrics (
                id INT AUTO_INCREMENT PRIMARY KEY,
                run_id INT,
                metric_name VARCHAR(100),
                metric_value FLOAT,
                FOREIGN KEY (run_id) REFERENCES algorithm_runs(id)
            )
            """
        ]
        
        for table in tables:
            cursor.execute(table)
        
        # Insert sample problems
        sample_problems = [
            ("Berlin52 TSP", "tsp", "data/tsp/berlin52.tsp"),
            ("Sample Knapsack", "knapsack", "data/knapsack/sample1.csv"),
            ("Bipartite Matching", "matching", "data/matching/bipartite5.json")
        ]
        
        cursor.executemany(
            "INSERT IGNORE INTO problems (name, type, dataset_path) VALUES (%s, %s, %s)",
            sample_problems
        )
        
        conn.commit()
        print("Database initialized successfully!")
        
    except mysql.connector.Error as e:
        print(f"Error initializing database: {e}")
    finally:
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == "__main__":
    init_database()