import os
import shutil

def fix_data_structure():
    print("Fixing data folder structure...")
    
    # Create correct structure
    folders = ['data/tsp', 'data/knapsack', 'data/matching']
    for folder in folders:
        os.makedirs(folder, exist_ok=True)
        print(f"✅ Created {folder}")
    
    # Move files to correct locations if they exist in wrong places
    moves = [
        ('data/knapsack/sample1.csv', 'data/knapsack/sample1.csv'),
        ('data/matching/bipartite5.json', 'data/matching/bipartite5.json'), 
        ('data/tsp/berlin52.tsp', 'data/tsp/berlin52.tsp')
    ]
    
    for src, dst in moves:
        if os.path.exists(src) and not os.path.exists(dst):
            shutil.move(src, dst)
            print(f"✅ Moved {src} to {dst}")
    
    print("✅ Data structure fixed!")

if __name__ == '__main__':
    fix_data_structure()