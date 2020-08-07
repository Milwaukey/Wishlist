from django.core.mail import send_mail


def email_message(message_dict):
   contents = f"""
   Hi, thank you for trying to reset your password. If you have forgot your username, it is: {message_dict['username']}
   <a href="127.0.0.1:8000/confirm-password-reset?token={message_dict['token']}">Click here to reset!</a> 
   
   """
   send_mail(
      'Password Reset Token',
      contents,
      'louise.h.jessen@gmail.com',
      [message_dict['email']],
      fail_silently=False
   ) 