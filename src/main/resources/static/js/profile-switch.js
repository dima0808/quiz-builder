document.addEventListener('DOMContentLoaded', function() {
    // Отримуємо посилання на всі радіокнопки
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    
    // Отримуємо посилання на всі блоки, які ми хочемо контролювати
    const testFinishBlock = document.getElementById('test-finish');
    const myTestBlock = document.getElementById('my-test');
    const kpiSupportBlock = document.getElementById('kpi-support');
    
    // Створюємо функції, які приховують всі блоки, крім вибраного
    function showTestFinishBlock() {
        testFinishBlock.style.display = 'block';
        myTestBlock.style.display = 'none';
        kpiSupportBlock.style.display = 'none';
    }
    
    function showMyTestBlock() {
        testFinishBlock.style.display = 'none';
        myTestBlock.style.display = 'block';
        kpiSupportBlock.style.display = 'none';
    }
    
    function showKpiSupportBlock() {
        testFinishBlock.style.display = 'none';
        myTestBlock.style.display = 'none';
        kpiSupportBlock.style.display = 'block';
    }
    
    // Приховуємо всі блоки, крім першого
    showTestFinishBlock();
    
    // Додаємо обробник подій для кожної радіокнопки
    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener('change', function() {
            // Перевіряємо, яка радіокнопка була вибрана і відображаємо відповідний блок
            if (radioButton.id === 'passed-tests') {
                showTestFinishBlock();
            } else if (radioButton.id === 'created-tests') {
                showMyTestBlock();
            } else if (radioButton.id === 'technical-support') {
                showKpiSupportBlock();
            }
        });
    });
});
