#!/usr/bin/env python3
"""
Enhanced launcher to run all microservices together with CORS enabled
Usage: python backend/run_all_services.py
        OR
        cd backend && python run_all_services.py
"""

import subprocess
import time
import sys
import os
from pathlib import Path

# Service configurations
SERVICES = [
    {"name": "PDF to Word", "file": "pdf_to_word.py", "port": 5001, "endpoint": "/api/convert"},
    {"name": "Word to PDF", "file": "word_to_pdf.py", "port": 5002, "endpoint": "/api/convert"},
    {"name": "PDF Merge", "file": "pdf_merge.py", "port": 5003, "endpoint": "/api/pdf-merge"},
    {"name": "Document Summary", "file": "document_summary.py", "port": 5004, "endpoint": "/api/summarize"},
    {"name": "PDF to Image", "file": "pdf_to_image.py", "port": 5005, "endpoint": "/api/convert"},
    {"name": "Image to PDF", "file": "image_to_pdf.py", "port": 5006, "endpoint": "/api/convert"},
    {"name": "Text Summary", "file": "text_summary.py", "port": 5007, "endpoint": "/api/summarize"},
    {"name": "Background Remove", "file": "bg_remove.py", "port": 5008, "endpoint": "/api/remove"},
    {"name": "Image Compress", "file": "image_compress.py", "port": 5009, "endpoint": "/api/compress"},
    {"name": "Voice to Text", "file": "voice_to_text.py", "port": 5010, "endpoint": "/api/transcribe"},
    {"name": "Text to Voice", "file": "text_to_voice.py", "port": 5011, "endpoint": "/api/convert"},
    {"name": "Plagiarism Checker", "file": "plagiarism_checker.py", "port": 5012, "endpoint": "/api/check"},
]

processes = []

def get_script_directory():
    """Get the directory where this script is located"""
    return Path(__file__).parent.absolute()

def check_file_exists(filepath):
    """Check if service file exists"""
    return filepath.exists()

def start_service(service, script_dir):
    """Start a single service - NOW SHOWS OUTPUT"""
    try:
        service_path = script_dir / service['file']
        print(f"🚀 Starting {service['name']} on port {service['port']}...")
        
        # REMOVED stdout/stderr capture - now you can see errors!
        process = subprocess.Popen(
            [sys.executable, str(service_path)],
            cwd=str(script_dir)
        )
        return process
    except Exception as e:
        print(f"❌ Failed to start {service['name']}: {str(e)}")
        return None

def main():
    print("=" * 70)
    print("🎯 MICROSERVICES LAUNCHER (Direct Access)")
    print("=" * 70)
    
    script_dir = get_script_directory()
    print(f"\n📂 Working directory: {script_dir}\n")
    
    # Check if all service files exist
    missing_files = []
    for service in SERVICES:
        service_path = script_dir / service['file']
        if not check_file_exists(service_path):
            missing_files.append(service['file'])
    
    if missing_files:
        print("\n❌ Missing service files:")
        for file in missing_files:
            print(f"   - {file}")
        print(f"\nPlease ensure all service files are in: {script_dir}")
        return
    
    print(f"✅ Found all {len(SERVICES)} service files\n")
    
    # Start all services
    for service in SERVICES:
        process = start_service(service, script_dir)
        if process:
            processes.append({"service": service, "process": process})
            time.sleep(1)  # Give more time to start
    
    print("\n" + "=" * 70)
    print(f"✅ Successfully started {len(processes)} services!")
    print("=" * 70)
    
    # Display service URLs
    print("\n📋 SERVICE ENDPOINTS:")
    print("-" * 70)
    for item in processes:
        service = item['service']
        url = f"http://localhost:{service['port']}{service['endpoint']}"
        health = f"http://localhost:{service['port']}/api/health"
        print(f"  • {service['name']:<25} → {url}")
        print(f"    Health: {health}")
    print("-" * 70)
    
    print("\n⚠️  Press Ctrl+C to stop all services")
    print("⚠️  Watch above for any error messages from services\n")
    
    try:
        while True:
            time.sleep(1)
            for item in processes:
                if item['process'].poll() is not None:
                    service = item['service']
                    print(f"\n⚠️  {service['name']} has stopped! (exit code: {item['process'].returncode})")
    
    except KeyboardInterrupt:
        print("\n\n🛑 Shutting down all services...")
        for item in processes:
            try:
                item['process'].terminate()
                item['process'].wait(timeout=5)
            except:
                item['process'].kill()
        print("✅ All services stopped successfully!")

if __name__ == "__main__":
    main()