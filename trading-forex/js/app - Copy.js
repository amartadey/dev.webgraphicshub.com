




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
gsap.to(".feature h2",
{
    y:"-50",
    scrollTrigger:{
        trigger:".feature h2",
        scroller:"body",
        start: "top 60%",
        end: "top -50%",
        scrub: 3,
    } 
})

gsap.to(".feature1",
{
    y: 100,
    scrollTrigger:{
        trigger:".feature1",
        scroller:"body",
        start: "top 50%",
        end: "top 0",
        scrub: 3,
    } 
})

gsap.to(".feature1 h3",
{
    x: 20,
    scrollTrigger:{
        trigger:".feature1 h3",
        scroller:"body",
        start: "top 50%",
        end: "top 0",
        scrub: 3,
    } 
})

gsap.to(".feature2",
{
    y: -100,
    scrollTrigger:{
        trigger:".feature2",
        scroller:"body",
        start: "top 30%",
        end: "top 0",
        scrub: 3,
    } 
})

gsap.to(".feature2 h3",
{
    x: 20,
    scrollTrigger:{
        trigger:".feature2 h3",
        scroller:"body",
        start: "top 50%",
        end: "top 0",
        scrub: 3,
    } 
})

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
    y:-90,
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
    transform:"translateX(-100%)",
    scrollTrigger:{
        trigger:"#privacy",
        scroller:"body",
        start:"top 0%",
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



gsap.to(".broker1",
{
    y: -20,
    scrollTrigger:{
        trigger:".broker1",
        scroller:"body",
        start: "top 60%",
        end: "top 0",
        scrub: 3,
    } 
})

gsap.to(".broker2",
{
    y: 20,
    scrollTrigger:{
        trigger:".broker2",
        scroller:"body",
        start: "top 60%",
        end: "top 0",
        scrub: 3,
    } 
})