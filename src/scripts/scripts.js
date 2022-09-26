$.validator.addMethod('minword', function(val, elem, param){
    return val.trim().split(' ').length >= param;
}, 'Please enter at least {0} words');

$.validator.addClassRules({
    name: {
        minword: 2
    }
});

$.validator.defaults.errorElement = 'div';
$.validator.defaults.errorClass = 'invalid-feedback';
$.validator.defaults.highlight = undefined;

if($('html').attr('lang') == 'ru') {
    $.extend($.validator.messages, {
        required: 'Это поле обязательно для заполнения.',
        remote: 'Пожалуйста, исправьте это поле.',
        email: 'Пожалуйста, введите действительный адрес электронной почты.',
        url: 'Пожалуйста, введите действительный URL.',
        date: 'Пожалуйста, введите правильную дату.',
        dateISO: 'Пожалуйста, введите правильную дату (ISO).',
        number: 'Пожалуйста, введите действительный номер.',
        digits: 'Пожалуйста, введите только цифры.',
        creditcard: 'Пожалуйста, введите действительный номер кредитной карты.',
        equalTo: 'Пожалуйста, введите то же значение еще раз.',
        accept: 'Пожалуйста, введите значение с допустимым расширением.',
        maxlength: $.validator.format('Введите не более {0} символов.'),
        minlength: $.validator.format('Введите не менее {0} символов.'),
        minword: $.validator.format('Введите не менее {0} слов.'),
        rangelength: $.validator.format('Введите значение от {0} до {1} символов.'),
        range: $.validator.format('Введите значение от {0} до {1}.'),
        max: $.validator.format('Пожалуйста, введите значение, меньшее или равное {0}.'),
        min: $.validator.format('Пожалуйста, введите значение больше или равное {0}.')
    });
}

$(function(){
    $('form .phone').mask('+7(999)999-99-99');
    $('form').validate({
        messages: {
            'parent[name]': {
                minword: 'Формат введенных данных только "Фамилия Имя Отчество" или "Фамилия Имя"'
            },
            'student[name]': {
                minword: 'Формат введенных данных только "Фамилия Имя Отчество" или "Фамилия Имя"'
            }
        },
        submitHandler: function(form) {
            $.post($(form).attr('action'), $(form).serialize(), function(data) {
                $(form)[0].reset();

                var message = $( "<div>" );
                if (data == 'success') {
                    message.addClass( 'success-valid' )
                        .html( 'Ваша форма отправлена!' );
                } else {
                    message.addClass( 'success-invalid' )
                        .html( 'Ваша форма НЕ отправлена!' );
                }
                message.insertAfter(form);
            });
        }
    });
});
