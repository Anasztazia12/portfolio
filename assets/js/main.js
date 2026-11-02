// Image sliders: arrows switch between the screenshots of a project
document.querySelectorAll('.slider').forEach(function (slider) {
    const images = slider.querySelectorAll('img');
    let current = 0;

    function show(index) {
        images[current].classList.remove('show');
        current = (index + images.length) % images.length;
        images[current].classList.add('show');
    }

    slider.querySelector('.prev').addEventListener('click', function () { show(current - 1); });
    slider.querySelector('.next').addEventListener('click', function () { show(current + 1); });
});
