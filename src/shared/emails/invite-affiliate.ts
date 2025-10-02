interface InviteAffiliateEmailHtmlProps {
  affiliate_name: string
  affiliate_id: string
}

export const INVITE_AFFILIATE_EMAIL_HTML = (props: InviteAffiliateEmailHtmlProps) => `
  <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo ao HUBELEZA</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Poppins', Arial, sans-serif;
            background-color: #f8f9fa;
            color: #333333;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 20px rgba(116, 4, 153, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #740499 0%, #8a0cb8 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        .logo {
            font-size: 32px;
            font-weight: 700;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
        }
        
        .subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            font-weight: 300;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 50px 40px;
        }
        
        .welcome-title {
            font-size: 28px;
            font-weight: 600;
            color: #333333;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .message {
            font-size: 16px;
            color: #666666;
            margin-bottom: 30px;
            text-align: center;
            line-height: 1.7;
        }
        
        .highlight {
            color: #740499;
            font-weight: 500;
        }
        
        .cta-section {
            text-align: center;
            margin: 40px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #740499 0%, #8a0cb8 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(116, 4, 153, 0.3);
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(116, 4, 153, 0.4);
        }
        
        .info-box {
            background-color: #f8f9fa;
            border-left: 4px solid #740499;
            padding: 20px;
            margin: 30px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .info-title {
            font-weight: 600;
            color: #333333;
            margin-bottom: 10px;
            font-size: 16px;
        }
        
        .info-text {
            font-size: 14px;
            color: #666666;
            line-height: 1.6;
        }
        
        .steps {
            margin: 30px 0;
        }
        
        .step {
            display: flex;
            align-items: flex-start;
            margin-bottom: 20px;
            padding: 0 10px;
        }
        
        .step-number {
            background: linear-gradient(135deg, #740499 0%, #8a0cb8 100%);
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 14px;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .step-content {
            font-size: 15px;
            color: #666666;
            padding-top: 4px;
        }
        
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        
        .footer-text {
            font-size: 14px;
            color: #888888;
            margin-bottom: 15px;
        }
        
        .company-info {
            font-size: 12px;
            color: #aaaaaa;
            line-height: 1.5;
        }
        
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #740499 50%, transparent 100%);
            margin: 30px 0;
        }
        
        /* Responsivo */
        @media only screen and (max-width: 600px) {
            .content {
                padding: 30px 20px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .logo {
                font-size: 28px;
            }
            
            .welcome-title {
                font-size: 24px;
            }
            
            .cta-button {
                padding: 14px 30px;
                font-size: 15px;
                color: #FFFFFF;
            }
            
            .step {
                padding: 0 5px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">HUBELEZA</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <h1 class="welcome-title">Bem-vindo(a) à equipe!</h1>
            
            <p class="message">
                Olá <span class="highlight">${props.affiliate_name}</span>,<br><br>
                Você foi cadastrado(a) como afiliado no sistema <strong>HUBELEZA</strong>. 
                Para começar a utilizar a plataforma, é necessário definir sua senha de acesso.
            </p>
            
            <div class="cta-section">
                <a href="https://panel.hubeleza.com.br/define-password?id=${props.affiliate_id}" class="cta-button">Definir minha senha</a>
            </div>
            
            <div class="divider"></div>
            
            <div class="info-box">
                <div class="info-title">🔒 Dicas de segurança:</div>
                <div class="info-text">
                    • Use uma senha com pelo menos 8 caracteres<br>
                    • Combine letras maiúsculas, minúsculas, números e símbolos<br>
                    • Não compartilhe suas credenciais de acesso<br>
                    • Mantenha seus dados de login sempre seguros
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p class="footer-text">
                Caso tenha alguma dúvida, entre em contato com nosso suporte.
            </p>
            <div class="company-info">
                Este é um email automático, não responda a esta mensagem.<br>
                © 2025 HUBELEZA - Todos os direitos reservados.
            </div>
        </div>
    </div>
</body>
</html>
`