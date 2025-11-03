"""
Text to Voice Converter
Converts text to speech audio files with multi-language support
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import io
import logging
import asyncio
import sys

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Enhanced language configuration with multiple voices and style options
LANGUAGE_CONFIG = {
    'en': {
        'voices': [
            {'id': 'en-US-AriaNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'en-GB-SoniaNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'en-US-GuyNeural', 'style': 'professional', 'gender': 'male'},
            {'id': 'en-GB-RyanNeural', 'style': 'professional', 'gender': 'male'}
        ],
        'pitch_adjust': '+0Hz',
        'style_options': ['professional', 'casual', 'newscast']
    },
    'zh': {
        'voices': [
            {'id': 'zh-CN-XiaoxiaoNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'zh-CN-YunxiNeural', 'style': 'professional', 'gender': 'male'},
            {'id': 'zh-CN-XiaochenNeural', 'style': 'casual', 'gender': 'female'},
            {'id': 'zh-TW-HsiaoChenNeural', 'style': 'professional', 'gender': 'female'}
        ],
        'pitch_adjust': '-2Hz',  # Slightly lower pitch for better tone reproduction
        'style_options': ['professional', 'calm', 'casual']
    },
    'ja': {
        'voices': [
            {'id': 'ja-JP-NanamiNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'ja-JP-KeitaNeural', 'style': 'professional', 'gender': 'male'},
            {'id': 'ja-JP-AoiNeural', 'style': 'casual', 'gender': 'female'}
        ],
        'pitch_adjust': '-1Hz',  # Slight pitch adjustment for natural intonation
        'style_options': ['professional', 'calm', 'cheerful']
    },
    'ko': {
        'voices': [
            {'id': 'ko-KR-SunHiNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'ko-KR-InJoonNeural', 'style': 'professional', 'gender': 'male'},
            {'id': 'ko-KR-JiMinNeural', 'style': 'casual', 'gender': 'female'}
        ],
        'pitch_adjust': '-1Hz',
        'style_options': ['professional', 'calm']
    },
    'hi': {
        'voices': [
            {'id': 'hi-IN-SwaraNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'hi-IN-MadhurNeural', 'style': 'professional', 'gender': 'male'}
        ],
        'pitch_adjust': '+0Hz',
        'style_options': ['professional', 'calm']
    },
    'bn': {
        'voices': [
            {'id': 'bn-BD-TanishaNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'bn-BD-PradeepNeural', 'style': 'professional', 'gender': 'male'},
            {'id': 'bn-IN-BashkarNeural', 'style': 'professional', 'gender': 'male'}
        ],
        'pitch_adjust': '+0Hz',
        'style_options': ['professional', 'calm']
    },
    'ar': {
        'voices': [
            {'id': 'ar-SA-ZariyahNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'ar-EG-ShakirNeural', 'style': 'professional', 'gender': 'male'},
            {'id': 'ar-AE-FatimaNeural', 'style': 'professional', 'gender': 'female'}
        ],
        'pitch_adjust': '-1Hz',  # Slight adjustment for Arabic phonetics
        'style_options': ['professional', 'calm']
    },
    'ru': {
        'voices': [
            {'id': 'ru-RU-SvetlanaNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'ru-RU-DmitryNeural', 'style': 'professional', 'gender': 'male'}
        ],
        'pitch_adjust': '+0Hz',
        'style_options': ['professional', 'calm']
    },
    'es': {
        'voices': [
            {'id': 'es-ES-ElviraNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'es-MX-DaliaNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'es-ES-AlvaroNeural', 'style': 'professional', 'gender': 'male'}
        ],
        'pitch_adjust': '+0Hz',
        'style_options': ['professional', 'cheerful', 'calm']
    },
    'fr': {
        'voices': [
            {'id': 'fr-FR-DeniseNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'fr-FR-HenriNeural', 'style': 'professional', 'gender': 'male'},
            {'id': 'fr-CA-SylvieNeural', 'style': 'professional', 'gender': 'female'}
        ],
        'pitch_adjust': '+0Hz',
        'style_options': ['professional', 'calm']
    },
    'de': {
        'voices': [
            {'id': 'de-DE-KatjaNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'de-DE-ConradNeural', 'style': 'professional', 'gender': 'male'},
            {'id': 'de-AT-JonasNeural', 'style': 'professional', 'gender': 'male'}
        ],
        'pitch_adjust': '+0Hz',
        'style_options': ['professional', 'calm']
    },
    'it': {
        'voices': [
            {'id': 'it-IT-ElsaNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'it-IT-DiegoNeural', 'style': 'professional', 'gender': 'male'},
            {'id': 'it-IT-IsabellaNeural', 'style': 'casual', 'gender': 'female'}
        ],
        'pitch_adjust': '+0Hz',
        'style_options': ['professional', 'cheerful', 'calm']
    },
    'pt': {
        'voices': [
            {'id': 'pt-BR-FranciscaNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'pt-PT-DuarteNeural', 'style': 'professional', 'gender': 'male'},
            {'id': 'pt-BR-AntonioNeural', 'style': 'professional', 'gender': 'male'}
        ],
        'pitch_adjust': '+0Hz',
        'style_options': ['professional', 'calm']
    },
    'tr': {
        'voices': [
            {'id': 'tr-TR-EmelNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'tr-TR-AhmetNeural', 'style': 'professional', 'gender': 'male'}
        ],
        'pitch_adjust': '+0Hz',
        'style_options': ['professional', 'calm']
    },
    'ur': {
        'voices': [
            {'id': 'ur-PK-UzmaNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'ur-IN-GulNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'ur-PK-AsadNeural', 'style': 'professional', 'gender': 'male'}
        ],
        'pitch_adjust': '+0Hz',
        'style_options': ['professional', 'calm']
    },
    'ta': {
        'voices': [
            {'id': 'ta-IN-PallaviNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'ta-SG-AnbuNeural', 'style': 'professional', 'gender': 'male'},
            {'id': 'ta-IN-ValluvarNeural', 'style': 'professional', 'gender': 'male'}
        ],
        'pitch_adjust': '+0Hz',
        'style_options': ['professional', 'calm']
    },
    'te': {
        'voices': [
            {'id': 'te-IN-ShrutiNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'te-IN-MohanNeural', 'style': 'professional', 'gender': 'male'}
        ],
        'pitch_adjust': '+0Hz',
        'style_options': ['professional', 'calm']
    },
    'ml': {
        'voices': [
            {'id': 'ml-IN-SobhanaNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'ml-IN-MidhunNeural', 'style': 'professional', 'gender': 'male'}
        ],
        'pitch_adjust': '+0Hz',
        'style_options': ['professional', 'calm']
    },
    'pa': {
        'voices': [
            {'id': 'pa-IN-GurleenNeural', 'style': 'professional', 'gender': 'female'},
            {'id': 'pa-IN-ManjinderNeural', 'style': 'professional', 'gender': 'male'}
        ],
        'pitch_adjust': '+0Hz',
        'style_options': ['professional', 'calm']
    }
}

# Language code mapping for gTTS (fallback)
GTTS_LANGUAGE_CODES = {
    'en': 'en',
    'bn': 'bn',
    'ur': 'ur',
    'hi': 'hi',
    'ar': 'ar',
    'es': 'es',
    'fr': 'fr',
    'de': 'de',
    'zh': 'zh',
    'ja': 'ja',
    'ko': 'ko',
    'ru': 'ru',
    'pt': 'pt',
    'it': 'it',
    'tr': 'tr',
    'ta': 'ta',
    'te': 'te',
    'ml': 'ml',
    'pa': 'pa',
}

@app.route('/api/health', methods=['GET'])
def health():
    edge_tts_available = False
    gtts_available = False
    
    try:
        import edge_tts
        edge_tts_available = True
    except ImportError:
        pass
    
    try:
        from gtts import gTTS
        gtts_available = True
    except ImportError:
        pass
    
    engines = []
    if edge_tts_available:
        engines.append('edge-tts')
    if gtts_available:
        engines.append('gTTS')
    
    return jsonify({
        'status': 'healthy' if engines else 'unhealthy',
        'service': 'Text to Voice Converter',
        'engines': engines,
        'message': 'Ready' if engines else 'No TTS engine available'
    }), 200

@app.route('/api/supported-languages', methods=['GET'])
def supported_languages():
    """Get supported languages with available voices and styles"""
    languages_info = []
    
    for lang_code, config in LANGUAGE_CONFIG.items():
        # Get the language name from the first voice's locale
        voice_locale = config['voices'][0]['id'].split('-')[1]
        
        # Map common language codes to names
        language_names = {
            'US': 'English (US)', 'GB': 'English (UK)',
            'CN': 'Chinese (Simplified)', 'TW': 'Chinese (Traditional)',
            'JP': 'Japanese', 'KR': 'Korean',
            'IN': 'Indian', 'BD': 'Bangladeshi',
            'SA': 'Arabic (Saudi)', 'EG': 'Arabic (Egyptian)', 'AE': 'Arabic (UAE)',
            'ES': 'Spanish (Spain)', 'MX': 'Spanish (Mexico)',
            'FR': 'French', 'CA': 'French (Canadian)',
            'DE': 'German', 'AT': 'German (Austrian)',
            'IT': 'Italian', 'PT': 'Portuguese', 'BR': 'Portuguese (Brazilian)',
            'TR': 'Turkish', 'PK': 'Urdu (Pakistan)', 'RU': 'Russian'
        }
        
        language_info = {
            "code": lang_code,
            "name": language_names.get(voice_locale, config['voices'][0]['id'].split('-')[0].upper()),
            "voices": [
                {
                    "id": voice['id'],
                    "gender": voice['gender'],
                    "style": voice['style'],
                    "locale": voice['id'].split('-')[1]
                } for voice in config['voices']
            ],
            "styles": config['style_options'],
            "pitch_adjustment": config['pitch_adjust']
        }
        
        languages_info.append(language_info)
    
    return jsonify({
        "languages": languages_info,
        "voice_styles": ["professional", "casual", "cheerful", "calm", "newscast"],
        "speed_options": ["slow", "normal", "fast"]
    })

async def generate_edge_tts(text, voice, speed, language='en'):
    """Generate speech using edge-tts with comprehensive multilingual support"""
    import edge_tts
    import re
    
    # Script categories for optimized processing
    SCRIPT_CONFIGS = {
        # South Asian scripts (more spacing, slower rate)
        'south_asian': {
            'languages': ['bn', 'hi', 'ta', 'te', 'ml', 'pa'],
            'sentence_markers': ['।', '.", "॥', '?', '!'],
            'chunk_size': 200,
            'rates': {'slow': '-20%', 'normal': '-10%', 'fast': '+0%'},
            'pitch': '+0Hz',  # Neutral pitch
            'volume': '+0%'   # Standard volume
        },
        # Middle Eastern scripts (right-to-left handling)
        'middle_eastern': {
            'languages': ['ar', 'ur'],
            'sentence_markers': ['。', '؟', '!', '.'],
            'chunk_size': 250,
            'rates': {'slow': '-15%', 'normal': '-5%', 'fast': '+5%'},
            'pitch': '+0Hz',
            'volume': '+0%'
        },
        # East Asian scripts (character-based spacing)
        'east_asian': {
            'languages': ['zh', 'ja', 'ko'],
            'sentence_markers': ['。', '？', '！', '.'],
            'chunk_size': 300,
            'rates': {'slow': '-15%', 'normal': '-5%', 'fast': '+5%'},
            'pitch': '+0Hz',
            'volume': '+0%'
        },
        # Cyrillic script
        'cyrillic': {
            'languages': ['ru'],
            'sentence_markers': ['.', '?', '!'],
            'chunk_size': 350,
            'rates': {'slow': '-10%', 'normal': '+0%', 'fast': '+10%'},
            'pitch': '+0Hz',
            'volume': '+0%'
        },
        # Latin and similar scripts (default handling)
        'latin': {
            'languages': ['en', 'es', 'fr', 'de', 'it', 'pt', 'tr'],
            'sentence_markers': ['.', '?', '!', ';'],
            'chunk_size': 500,
            'rates': {'slow': '-10%', 'normal': '+0%', 'fast': '+10%'},
            'pitch': '+0Hz',
            'volume': '+0%'
        }
    }
    
    # Determine script category for the language
    script_category = next(
        (cat for cat, config in SCRIPT_CONFIGS.items() 
         if language in config['languages']),
        'latin'  # Default to Latin script handling
    )
    
    config = SCRIPT_CONFIGS[script_category]
    
    # Get optimized settings for this language/script
    rate = config['rates'][speed]
    chunk_size = config['chunk_size']
    pitch = config['pitch']
    volume = config['volume']
    
    # Build regex pattern for sentence splitting
    markers_pattern = '|'.join(map(re.escape, config['sentence_markers']))
    split_pattern = f'([{markers_pattern}])'
    
    # Split text into sentences using script-appropriate markers
    sentences = re.split(split_pattern, text)
    sentences = [''.join(i) for i in zip(sentences[0::2], sentences[1::2] + [''] * (len(sentences) % 2))]
    sentences = [s.strip() for s in sentences if s.strip()]
    
    # Process text in smaller chunks with script-specific handling
    audio_data = b""
    current_chunk = ""
    
    # Add proper spacing based on script type
    space_char = " " if script_category in ['latin', 'cyrillic'] else ""
    
    for sentence in sentences:
        if len(current_chunk) + len(sentence) > chunk_size:
            if current_chunk:
                # Configure TTS with script-specific settings
                communicate = edge_tts.Communicate(
                    text=current_chunk,
                    voice=voice,
                    rate=rate,
                    volume=volume,
                    pitch=pitch
                )
                
                try:
                    async for chunk in communicate.stream():
                        if chunk["type"] == "audio":
                            audio_data += chunk["data"]
                except Exception as e:
                    logger.error(f"Error processing chunk in {language}: {str(e)}")
                    # Continue with next chunk instead of failing completely
                    continue
                    
                current_chunk = sentence
            else:
                current_chunk = sentence
        else:
            current_chunk += space_char + sentence if current_chunk else sentence
    
    # Process the last chunk
    if current_chunk:
        try:
            communicate = edge_tts.Communicate(
                text=current_chunk,
                voice=voice,
                rate=rate,
                volume=volume,
                pitch=pitch
            )
            
            async for chunk in communicate.stream():
                if chunk["type"] == "audio":
                    audio_data += chunk["data"]
        except Exception as e:
            logger.error(f"Error processing final chunk in {language}: {str(e)}")
            if not audio_data:  # Only raise if we haven't generated any audio yet
                raise
    
    return audio_data

@app.route('/api/text-to-voice', methods=['POST'])
def text_to_voice():
    """Convert text to speech with enhanced voice quality"""
    try:
        # Get input data
        if request.is_json:
            data = request.json
            text = data.get('text', '').strip()
            language = data.get('language', 'en')
            speed = data.get('speed', 'normal')
            engine = data.get('engine', 'auto')
            voice_gender = data.get('voice_gender', 'female')  # 'female' or 'male'
            style = data.get('style', 'professional')  # voice style
        else:
            text = request.form.get('text', '').strip()
            language = request.form.get('language', 'en')
            speed = request.form.get('speed', 'normal')
            engine = request.form.get('engine', 'auto')
            voice_gender = request.form.get('voice_gender', 'female')
            style = request.form.get('style', 'professional')
        
        # Validate input
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        if len(text) > 5000:
            return jsonify({'error': 'Text too long (max 5000 characters)'}), 400
        
        if speed not in ['slow', 'normal', 'fast']:
            speed = 'normal'
        
        # Check available engines
        edge_tts_available = False
        gtts_available = False
        
        try:
            import edge_tts
            edge_tts_available = True
        except ImportError:
            pass
        
        try:
            from gtts import gTTS
            gtts_available = True
        except ImportError:
            pass
        
        # Determine which engine to use
        if engine == 'auto':
            if edge_tts_available:
                engine = 'edge'
            elif gtts_available:
                engine = 'google'
            else:
                return jsonify({'error': 'No TTS engine available. Install edge-tts or gTTS'}), 500
        elif engine == 'edge' and not edge_tts_available:
            if gtts_available:
                engine = 'google'
                logger.warning("edge-tts not available, using gTTS")
            else:
                return jsonify({'error': 'edge-tts not installed. Run: pip install edge-tts'}), 500
        elif engine == 'google' and not gtts_available:
            if edge_tts_available:
                engine = 'edge'
            else:
                return jsonify({'error': 'gTTS not installed. Run: pip install gTTS'}), 500
        
        # Try to generate speech
        if engine == 'edge':
            try:
                logger.info(f"Using edge-tts for language: {language}")
                # Get language configuration
                lang_config = LANGUAGE_CONFIG.get(language, LANGUAGE_CONFIG['en'])
                
                # Find the best matching voice based on gender and style
                matching_voices = [
                    v for v in lang_config['voices'] 
                    if v['gender'] == voice_gender and 
                    (style in lang_config['style_options'] and v['style'] == style)
                ]
                
                # Fallback to any voice of the preferred gender if style doesn't match
                if not matching_voices:
                    matching_voices = [v for v in lang_config['voices'] if v['gender'] == voice_gender]
                
                # Final fallback to any available voice
                if not matching_voices:
                    matching_voices = lang_config['voices']
                
                # Select the voice
                voice = matching_voices[0]['id']
                
                # Get language-specific pitch adjustment
                pitch_adjust = lang_config['pitch_adjust']
                
                # Run async function with enhanced settings
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
                try:
                    audio_data = loop.run_until_complete(
                        generate_edge_tts(
                            text=text,
                            voice=voice,
                            speed=speed,
                            language=language,
                            pitch_adjust=pitch_adjust,
                            style=style
                        )
                    )
                finally:
                    loop.close()
                
                output = io.BytesIO(audio_data)
                output.seek(0)
                
                logger.info("Speech generated successfully using edge-tts")
                
                filename = 'speech_output.mp3'
                return send_file(output, mimetype='audio/mpeg', as_attachment=True, download_name=filename)
                
            except Exception as e:
                logger.error(f"edge-tts failed: {str(e)}")
                if gtts_available:
                    logger.info("Falling back to gTTS")
                    engine = 'google'
                else:
                    return jsonify({'error': f'edge-tts failed: {str(e)}'}), 500
        
        if engine == 'google':
            try:
                logger.info(f"Using gTTS for language: {language}")
                lang_code = GTTS_LANGUAGE_CODES.get(language, 'en')
                slow = speed == 'slow'
                
                from gtts import gTTS
                tts = gTTS(text=text, lang=lang_code, slow=slow)
                
                output = io.BytesIO()
                tts.write_to_fp(output)
                output.seek(0)
                
                logger.info("Speech generated successfully using gTTS")
                
                filename = 'speech_output.mp3'
                return send_file(output, mimetype='audio/mpeg', as_attachment=True, download_name=filename)
                
            except Exception as e:
                logger.error(f"gTTS failed: {str(e)}")
                return jsonify({'error': f'gTTS failed: {str(e)}'}), 500
        
        return jsonify({'error': 'Unable to generate speech'}), 500
        
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return jsonify({'error': f'Server error: {str(e)}'}), 500

if __name__ == '__main__':
    print("\n" + "=" * 70)
    print("🔊 TEXT TO VOICE CONVERTER")
    print("=" * 70)
    
    # Check dependencies
    edge_available = False
    gtts_available = False
    
    try:
        import edge_tts
        edge_available = True
        print("✅ edge-tts available")
    except ImportError:
        print("❌ edge-tts not installed (pip install edge-tts)")
    
    try:
        from gtts import gTTS
        gtts_available = True
        print("✅ gTTS available")
    except ImportError:
        print("❌ gTTS not installed (pip install gTTS)")
    
    if not edge_available and not gtts_available:
        print("\n⚠️  No TTS engine available!")
        print("Install with: pip install edge-tts gTTS")
        sys.exit(1)
    
    print("\n🚀 Starting Text to Voice service on http://localhost:5011")
    print("=" * 70 + "\n")
    
    app.run(debug=False, host='0.0.0.0', port=5011, use_reloader=False)