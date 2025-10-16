 function myFunction() {
            var element = document.body;
            console.log(element.classList.value)

            element.classList.toggle("dark-mode");

            if(element.classList.contains("dark-mode")){
                localStorage.setItem("theme", "")
            } else {
                localStorage.setItem("theme", "dark-mode")
            }
        }
document.addEventListener("DOMContentLoaded", function() {
    var element = document.body;
    if (localStorage.getItem("theme") == "dark-mode"){
        element.classList.remove("dark-mode")
    } else {
        element.classList.add("dark-mode")
    }
});




gsap.to(".banner-text h1",
{
    y:-100,
    scrollTrigger:{
        trigger:".banner-text h1",
        scroller:"body",
        start: "top 27%",
        end: "top 0",
        scrub: 3,
    } 
})
gsap.to(".banner-para p",
    {
        y: -50,
        scrollTrigger:{
            trigger:".banner-para p",
            scroller:"body",
            start: "top 27%",
            end: "top 0",
            scrub: 3,
        } 
})
gsap.to(
"#hero img" ,
{
    width:"90%",
    duration:1,
    scrollTrigger:{
        trigger:"#hero img",
        scroller:"body",
        start:"top 50%",
        end:"top 0%",
        scrub:5,
    }
}
)


gsap.from(".intro-bx h2",
{
    y: -50,
    scrollTrigger:{
        trigger:".intro-bx h2",
        scroller:"body",
        start: "top 50%",
        end: "top 0",
        scrub: 3,
    } 
})
gsap.to(".intro-bx p",
{
    x: 20,
    scrollTrigger:{
        trigger:".intro-bx p",
        scroller:"body",
        start: "top 50%",
        end: "top 0",
        scrub: 3,
    } 
})

gsap.to(".touch-text h1",
{
    y:-40,
    scrollTrigger:{
        trigger:".touch-text h1",
        scroller:"body",
        start: "top 27%",
        end: "top 0",
        scrub: 3,
    } 
})
gsap.to(".touch-para p",
{
    y: -50,
    scrollTrigger:{
        trigger:".touch-para p",
        scroller:"body",
        start: "top 40%",
        end: "top 0",
        scrub: 3,
    } 
})

gsap.to("#privacy h1",
{
    transform:"translateX(-50%)",
    scrollTrigger:{
        trigger:"#privacy",
        scroller:"body",
        start:"top -5%",
        end:"top -10%",
        scrub:2,
        pin:true,
    }
})


gsap.to(".broker-text h1",
{
    y:-100,
    scrollTrigger:{
        trigger:".broker-text h1",
        scroller:"body",
        start: "top 27%",
        end: "top 0",
        scrub: 3,
    } 
})
gsap.to(".broker-para p",
    {
        y: -80,
        scrollTrigger:{
            trigger:".broker-para p",
            scroller:"body",
            start: "top 27%",
            end: "top 0",
            scrub: 3,
        } 
})



gsap.to(".about-banner h2",
{
    y:-80,
    scrollTrigger:{
        trigger:".about-banner h2",
        scroller:"body",
        start: "top 10%",
        end: "top 0",
        scrub: 3,
    } 
})
gsap.to(".about-banner p",
    {
        y: -50,
        scrollTrigger:{
            trigger:".about-banner p",
            scroller:"body",
            start: "top 27%",
            end: "top 0",
            scrub: 3,
        } 
})

gsap.to(".broker-text .brok-img",
{
        y: -30,
        scrollTrigger:{
            trigger:".broker-text .brok-img",
            scroller:"body",
            start: "top -10%",
            end: "top 10%",
            scrub: 3,
        } 
})