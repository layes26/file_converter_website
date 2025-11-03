"""
Word to PDF Converter using Microsoft Office COM
Perfect quality using your installed Microsoft Office
Windows only - requires MS Office installed
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import io
import tempfile
from pathlib import Path
import logging
import time

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = tempfile.gettempdir()
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB


def check_msoffice():
    """Check if Microsoft Office is installed"""
    try:
        import win32com.client
        
        # Try to create Word application
        word = win32com.client.Dispatch("Word.Application")
        version = word.Version
        word.Quit()
        
        return True, version
    except ImportError:
        return False, "pywin32 not installed"
    except Exception as e:
        return False, str(e)


@app.route('/api/health', methods=['GET'])
def health():
    """Health check with MS Office detection"""
    is_available, info = check_msoffice()
    
    if is_available:
        return jsonify({
            'status': 'healthy',
            'service': 'Word to PDF Converter (MS Office COM)',
            'method': 'Microsoft Office',
            'office_version': info,
            'quality': '5/5 stars',
            'features': [
                'Perfect Word formatting',
                'All fonts preserved',
                'Images and shapes',
                'Tables with complex styling',
                'Headers and footers',
                'SmartArt and diagrams'
            ]
        }), 200
    else:
        return jsonify({
            'status': 'degraded',
            'service': 'Word to PDF Converter',
            'error': info,
            'solutions': [
                'Install Microsoft Office',
                'Install pywin32: pip install pywin32',
                'Run as Administrator if permission issues'
            ]
        }), 200


@app.route('/api/word-to-pdf', methods=['POST'])
def word_to_pdf():
    """Convert Word to PDF using Microsoft Office"""
    
    # Check dependencies
    try:
        import win32com.client
        import pythoncom
    except ImportError:
        return jsonify({
            'error': 'pywin32 not installed',
            'solution': 'Run: pip install pywin32',
            'then': 'Restart your terminal/IDE'
        }), 500
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    filename_lower = file.filename.lower()
    
    if not filename_lower.endswith(('.doc', '.docx')):
        return jsonify({'error': 'Only Word files (.doc, .docx) are allowed'}), 400
    
    # Create temporary paths
    temp_input = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))
    temp_output = os.path.join(UPLOAD_FOLDER, Path(file.filename).stem + '_converted.pdf')
    
    word = None
    
    try:
        logger.info(f"Starting MS Office conversion: {file.filename}")
        
        # Save uploaded file
        file.save(temp_input)
        
        # Convert paths to absolute
        input_path = os.path.abspath(temp_input)
        output_path = os.path.abspath(temp_output)
        
        logger.info(f"Input: {input_path}")
        logger.info(f"Output: {output_path}")
        
        # Initialize COM
        pythoncom.CoInitialize()
        
        # Create Word application
        logger.info("Starting Microsoft Word...")
        word = win32com.client.Dispatch("Word.Application")
        word.Visible = False  # Don't show Word window
        word.DisplayAlerts = False  # Don't show alerts
        
        logger.info("Opening Word document...")
        # Open the Word document
        doc = word.Documents.Open(input_path, ReadOnly=True)
        
        logger.info("Converting to PDF...")
        # Save as PDF
        # wdFormatPDF = 17
        doc.SaveAs(output_path, FileFormat=17)
        
        # Close document
        doc.Close(SaveChanges=False)
        logger.info("Document closed")
        
        # Quit Word
        word.Quit()
        word = None
        
        # Clean up COM
        pythoncom.CoUninitialize()
        
        logger.info("✅ Conversion completed successfully")
        
        # Check if PDF was created
        if not os.path.exists(output_path):
            raise Exception("PDF file was not created")
        
        # Read the PDF file
        with open(output_path, 'rb') as f:
            output = io.BytesIO(f.read())
        output.seek(0)
        
        # Get file size for logging
        pdf_size = os.path.getsize(output_path)
        logger.info(f"PDF size: {pdf_size / 1024:.2f} KB")
        
        # Clean up temporary files
        try:
            os.remove(temp_input)
            os.remove(temp_output)
        except Exception as e:
            logger.warning(f"Could not remove temp files: {str(e)}")
        
        # Send the PDF
        filename = Path(file.filename).stem + '_converted.pdf'
        response = send_file(
            output,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=filename
        )
        
        response.headers['X-Conversion-Method'] = 'Microsoft Office COM'
        response.headers['X-Office-Version'] = word.Version if word else 'Unknown'
        
        return response
    
    except Exception as e:
        # Clean up on error
        logger.error(f"Conversion error: {str(e)}")
        
        # Make sure Word is closed
        if word:
            try:
                word.Quit()
            except:
                pass
        
        # Clean up COM
        try:
            pythoncom.CoUninitialize()
        except:
            pass
        
        # Remove temp files
        try:
            if os.path.exists(temp_input):
                os.remove(temp_input)
            if os.path.exists(temp_output):
                os.remove(temp_output)
        except:
            pass
        
        return jsonify({
            'error': f'Conversion failed: {str(e)}',
            'details': 'Make sure Microsoft Office is installed and not currently open'
        }), 500


if __name__ == '__main__':
    print("\n" + "=" * 70)
    print("🚀 WORD TO PDF CONVERTER - MICROSOFT OFFICE COM")
    print("=" * 70)
    print("\n📋 System Check:\n")
    
    # Check Python version
    import sys
    print(f"  ✓ Python: {sys.version.split()[0]}")
    
    # Check pywin32
    try:
        import win32com.client
        print("  ✓ pywin32: Installed")
    except ImportError:
        print("  ✗ pywin32: NOT INSTALLED")
        print("    Run: pip install pywin32")
    
    # Check MS Office
    is_available, info = check_msoffice()
    if is_available:
        print(f"  ✓ Microsoft Office: Version {info}")
    else:
        print(f"  ✗ Microsoft Office: {info}")
    
    print("\n" + "=" * 70)
    print("✨ Features:")
    print("  • Perfect preservation of Word formatting")
    print("  • All fonts, colors, and styles maintained")
    print("  • Tables with borders and shading")
    print("  • Embedded images and shapes")
    print("  • Headers, footers, and page numbers")
    print("  • SmartArt, charts, and diagrams")
    print("  • Hyperlinks and bookmarks")
    print("  • Comments and track changes (visible)")
    print("\n" + "=" * 70)
    print("⚡ Quality: 100% Microsoft Office compatible")
    print("🌐 Service running on http://localhost:5002")
    print("=" * 70 + "\n")
    
    app.run(debug=True, host='0.0.0.0', port=5002, threaded=True)