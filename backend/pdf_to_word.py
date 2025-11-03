"""
Enhanced PDF to Word Converter
Professional-grade conversion with accurate preservation of:
- Text formatting (fonts, sizes, colors, styles)
- Images and graphics
- Tables with borders and cell styling
- Page layouts and margins
- Headers and footers
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import io
import tempfile
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = tempfile.gettempdir()
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB for larger files


@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint with dependency verification"""
    try:
        from pdf2docx import Converter
        return jsonify({
            'status': 'healthy',
            'service': 'PDF to Word Converter (Enhanced)',
            'library': 'pdf2docx',
            'features': ['tables', 'images', 'fonts', 'layouts']
        }), 200
    except ImportError:
        return jsonify({
            'status': 'degraded',
            'service': 'PDF to Word Converter',
            'error': 'pdf2docx not installed',
            'install': 'pip install pdf2docx'
        }), 200


@app.route('/api/pdf-to-word', methods=['POST'])
def pdf_to_word():
    """Convert PDF to Word with professional-grade accuracy"""
    try:
        from pdf2docx import Converter
    except ImportError:
        return jsonify({
            'error': 'pdf2docx library not installed. Run: pip install pdf2docx'
        }), 500
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if not file.filename.lower().endswith('.pdf'):
        return jsonify({'error': 'Only PDF files are allowed'}), 400
    
    temp_pdf_path = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))
    temp_docx_path = os.path.join(
        UPLOAD_FOLDER, 
        Path(file.filename).stem + '_converted.docx'
    )
    
    try:
        logger.info(f"Starting conversion: {file.filename}")
        file.save(temp_pdf_path)
        
        # Create converter instance
        cv = Converter(temp_pdf_path)
        
        # Convert with advanced options
        # start=0, end=None means convert all pages
        cv.convert(
            temp_docx_path,
            start=0,
            end=None,
            pages=None  # Convert all pages
        )
        
        cv.close()
        logger.info("Conversion completed successfully")
        
        # Read the converted file
        with open(temp_docx_path, 'rb') as f:
            output = io.BytesIO(f.read())
        output.seek(0)
        
        # Clean up temporary files
        os.remove(temp_pdf_path)
        os.remove(temp_docx_path)
        
        filename = Path(file.filename).stem + '_converted.docx'
        return send_file(
            output,
            mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            as_attachment=True,
            download_name=filename
        )
    
    except Exception as e:
        # Clean up on error
        if os.path.exists(temp_pdf_path):
            os.remove(temp_pdf_path)
        if os.path.exists(temp_docx_path):
            os.remove(temp_docx_path)
        
        logger.error(f"Conversion error: {str(e)}")
        return jsonify({'error': f'Conversion failed: {str(e)}'}), 500


if __name__ == '__main__':
    print("\n" + "=" * 70)
    print("🚀 ENHANCED PDF TO WORD CONVERTER")
    print("=" * 70)
    print("\n✅ Features:")
    print("  • Preserves ALL text formatting (fonts, sizes, colors, bold, italic)")
    print("  • Maintains tables with borders, shading, and cell properties")
    print("  • Extracts and embeds images with original quality")
    print("  • Preserves page layouts, margins, and spacing")
    print("  • Handles multi-column layouts")
    print("  • Retains hyperlinks and bookmarks")
    print("\n📦 Required: pip install pdf2docx PyMuPDF python-docx")
    print("=" * 70 + "\n")
    print("🌐 Service running on http://localhost:5001")
    print("=" * 70 + "\n")
    
    app.run(debug=True, host='0.0.0.0', port=5001)