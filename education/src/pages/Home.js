import {Footer} from '../components/Footer'
import HomepageNav from "../components/HomepageNav";
import {Typography, Grid, Button } from '@mui/material'
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from "react";
import '../App.css'
import { useNavigate } from 'react-router-dom';


gsap.registerPlugin(ScrollTrigger);


export const Home=()=>{

    const navigate=useNavigate();
    const scrollRef0 = useRef(null);
    const scrollRef = useRef(null);
    const scrollRef1 = useRef(null);
    const scrollRef2 = useRef(null);
    const scrollRef3 = useRef(null);
    const scrollRef7 = useRef(null);
    const scrollRef8 = useRef(null);
    const scrollRef9 = useRef(null);
    const scrollRef10 = useRef(null);
    const pscrollRef1 = useRef(null);
    const pscrollRef2 = useRef(null);
    const scrollRef20 = useRef(null);
    const scrollRef21 = useRef(null);

    useGSAP(() => {

        gsap.fromTo("#Grid1", {
            opacity: 0,
            y: -500
        }, {
            opacity: 1,
            y: 0,
            delay: 1
        })

    }, []);

    useGSAP(() => {

        gsap.fromTo("#text0", {
            opacity: 0,
            x: 750
        }, {
            x: 550,
            opacity: 1,
            scrollTrigger: {
                trigger: '#text0',
                start: 'top bottom',
                end: 'top 10%',
                scrub: true
            }
        })

    });



    useGSAP(() => {

        gsap.fromTo('#pGrid2', {
            x: -60,
            opacity: 0
        }, {
            x: '0',
            opacity: 1,
            scrollTrigger: {
                trigger: '#pGrid2',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    }, { scope: pscrollRef1 });

    useGSAP(() => {

        gsap.fromTo('#pGrid3', {
            scale: 0,
            opacity: 0
        }, {
            scale: '1.2',
            opacity: 1,
            scrollTrigger: {
                trigger: '#pGrid3',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    }, { scope: pscrollRef2 });

    useGSAP(() => {

        gsap.fromTo('#Grid2', {
            x: -590,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid2',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    });

    useGSAP(() => {

        gsap.fromTo('#text1', {
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid2',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    });

    useGSAP(() => {

        gsap.fromTo('#Grid7', {
            opacity: 0,
            scale: 1.4
        }, {
            scale: 1,
            duration: 1,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid7',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    });

    useGSAP(() => {

        gsap.fromTo('#Grid9', {
            opacity: 0,
            x: 100
        }, {
            x: 0,
            duration: 1,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid9',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    });

    useGSAP(() => {

        gsap.fromTo('#Grid10', {
            opacity: 0,
            x: -700
        }, {
            x: 0,
            duration: 1,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid10',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    });
    useGSAP(() => {

        gsap.fromTo('#Grid8', {
            opacity: 0,
            scale: 1.4
        }, {
            scale: 1,
            duration: 1,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid8',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    });

    useGSAP(() => {

        gsap.fromTo('#text2', {
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid3',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    });
    useGSAP(() => {
        gsap.fromTo('#Grid3', {
            x: 50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid3',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        })
    })
    useGSAP(() => {
        gsap.fromTo('#Grid4', {
            x: -790,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid4',
                start: 'top bottom',
                end: 'top 40%',
                scrub: true
            }
        })
    })

    useGSAP(() => {
        gsap.fromTo('#pGrid4', {
            x: -150,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '#pGrid4',
                start: 'top center',
                end: 'top 40%',
                scrub: true
            }
        })
    })

    useGSAP(() => {
        gsap.fromTo('#Grid5', {
            x: -250,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid5',
                start: 'top bottom',
                end: 'top 40%',
                scrub: true
            }
        })
    })
    const subtitle2=useRef(null);
    useGSAP(() => {
        gsap.fromTo('#subtitle2', {
            
            opacity: 0
        }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '#subtitle2',
                start: 'top bottom',
                end: 'top 40%',
                scrub: true
            }
        })
    })


    useGSAP(() => {
        gsap.fromTo('#button', {
            x: -250,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '#button',
                start: 'top bottom',
                end: 'top 40%',
                scrub: true
            }
        })
    })

    return (
        <div style={{ backgroundColor: "black", minHeight: "100vh", minWidth: "100vw",fontStretch: 'extra-condensed',
        fontFamily: 'math',
        fontWeight: '500',
        fontVariant: 'small-caps' }} >

            <div className="phoneSize">
                <div>
                    <HomepageNav />
                </div>

                <div id="Grid1" className="imageContainer">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12} >

                            <h2 className="title" style={{color:"white"}}>Discover the Ultimate Education Platform</h2>

                            <h4 className="subtitle" style={{color:"white"}}>
                            Immerse yourself in a transformative educational experience with our innovative platform designed to empower learners of all ages and backgrounds. </h4>

                            <div>

                                <Button variant="outlined" className="login" >Login</Button>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} style={{ justifyContent: "center", alignContent: "center", textAlign: "center", alignItems: "Center" }}>

                            <Grid item xs={12} sm={12}  >

                            </Grid>

                        </Grid>

                    </Grid>
                </div>
                <center> <div>
                    <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="img1" alt="" id="pGrid2" ref={pscrollRef1} />
                </div></center>

                <center><div className="subtitle2" id="subtitle2" ref={subtitle2} style={{marginTop:"100px",marginBottom:"0px"}} >
                Discover a vast array of courses covering a multitude of subjects, from traditional academic disciplines to cutting-edge fields of study.
                </div></center>

                <div>
                    <center><img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWR1Y2F0aW9ufGVufDB8fDB8fHww" className="img2" alt="" id="pGrid3" ref={pscrollRef2} style={{marginTop:"60px"}}/></center>
                </div>

                <center><div className="subtitle2" id="subtitle2" ref={subtitle2} style={{marginTop:"90px",marginBottom:"30px"}} >
                Discover a vast array of courses covering a multitude of subjects, from traditional academic disciplines to cutting-edge fields of study.
                </div></center>

                <div>
                    <center><img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww" className="img3" alt="" /></center>
                </div>

                <center><div className="subtitle2" style={{marginTop:"20px"}}>
                Personalize your learning journey with customizable learning paths tailored to your individual interests, goals, and learning style.
                </div></center>


                <div >
                    <center> <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww" className="img5" alt="" id="pGrid4" ref={scrollRef21} /></center>
                </div>

                <center><div className="subtitle4">
                Connect with a global community of learners, educators, and experts through our collaborative features, including discussion forums, virtual classrooms, and peer-to-peer learning networks. 
                </div></center>


                <div>
                    <center> <img src="https://images.unsplash.com/photo-1594312915251-48db9280c8f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D" className="img6" alt="" id="Grid5" ref={scrollRef3} /></center>
                </div>

                <center><div className="subtitle4">
                Discover a vast array of courses covering a multitude of subjects, from traditional academic disciplines to cutting-edge fields of study. 
                </div></center>

                <center><div style={{ fontWeight: 100, fontSize: '1.5rem', color: '#86868b', marginBottom: '10px' }}>
                    Nurture Your Education Skills with Our Platform!
                </div></center>


                <center><div className="div" id="button" ref={scrollRef20} style={{fontFamily:"cursive"}}>
                    <h2 className="innerdiv">Ready to get started?</h2>
                    <div className="innerdiv1"><Button variant="outlined" onClick={(e)=>{navigate('/register')}}>Join with Us</Button></div>
                </div></center>


                <Footer />


            </div>


            <div className="laptopLarge" >
                <div style={{ color: "white", fontSize: "1rem"}}>

                    <div>
                        <HomepageNav />
                    </div>

                    <div id="Grid1">
                        <Grid container spacing={5}  >
                            <Grid item xs={12} sm={12} md={12} lg={7} sx={{ textAlign: "center", alignItems: "center", alignContent: "center", marginTop: "-20px" }}>

                                <Typography variant="h2" style={{ fontSize: "4.4rem", marginBottom: "15px", color: "#86868b" }}>Discover the Ultimate Education Hub</Typography>

                                <Typography variant="h6" style={{  marginBottom: "20px", marginLeft: "3px", color: "#86868b" }}>
                                 Immerse yourself in a transformative educational experience with our innovative platform designed to empower learners of all ages and backgrounds. Our comprehensive education platform provides a dynamic learning environment where exploration, collaboration, and discovery thrive....</Typography>

                                <div style={{ marginTop: "70px" }}>
                                    <Button variant="outlined" sx={{ width: "200px", height: "55px", marginRight: "20px", borderRadius: "35px" }}
                                      onClick={(e)=>navigate('/register')} >Start Your Journey</Button>

                                    <Button variant="outlined" sx={{ width: "200px", height: "55px", borderRadius: "35px" }} >Sign in</Button>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={4} style={{ justifyContent: "center", alignContent: "center", textAlign: "center", alignItems: "Center" }}>

                                <Grid item xs={12} sm={12} md={12} lg={3} >
                                    <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{ width: "500px", height: "auto",marginTop:"70px",borderRadius: "15px" }} alt="" />
                                </Grid>
                                <Grid xs={12} sm={12} md={12} lg={3} >
                                    <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWR1Y2F0aW9ufGVufDB8fDB8fHww"
                                        style={{ width: "500px", height: "auto", borderRadius: "15px", opacity: 0.8 }}
                                    alt=''
                                    />
                                </Grid>
                            </Grid>

                        </Grid>
                    </div>
                    <div >
                        <Grid container spacing={5} >

                            <Grid item xs={12} sm={12} md={12} lg={7} style={{
                                textAlign: "center"
                            }} >
                                <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZWR1Y2F0aW9ufGVufDB8fDB8fHww" style={{ width: "400px", height: "auto", marginTop: "-150px" }} alt="" id="Grid2" ref={scrollRef} />
                            </Grid>



                            <Grid item xs={12} sm={12} md={12} lg={4} style={{ textAlign: "center", marginTop: "150px", color: "#86868b" }} >
                                <span style={{ fontSize: "1.2rem", fontWeight: 100 }} id="text1" ref={scrollRef}>
                                Discover a vast array of courses covering a multitude of subjects, from traditional academic disciplines to cutting-edge fields of study. Whether you're interested in mathematics, literature, science, technology, or the arts, our platform offers engaging and interactive lessons curated by experts in their respective fields.
                                </span>
                            </Grid>

                        </Grid>
                    </div>
                    <Grid container spacing={5}>

                        <Grid item xs={12} sm={12} md={12} lg={7} style={{ textAlign: "center", marginTop: "55px", color: "#86868b" }}>
                            <Typography variant="h6" id="text2" ref={scrollRef1}>
                            Personalize your learning journey with customizable learning paths tailored to your individual interests, goals, and learning style. From interactive quizzes and assessments to hands-on projects and simulations, our platform offers a variety of learning activities designed to enhance comprehension and retention.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={5} style={{
                            textAlign: "center", marginBottom: "20px"
                        }}>
                            <img src="https://images.unsplash.com/photo-1594312915251-48db9280c8f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D" style={{ width: "400px", height: "auto", opacity: 0.8, marginTop: "-18px" }} alt="" id="Grid3" ref={scrollRef1} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={0}>

                        <Grid item xs={12} sm={12} md={12} lg={6} style={{
                            textAlign: "end", marginBottom: "20px"
                        }}>
                            <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww" style={{ width: "400px", height: "auto", opacity: 0.8, marginTop: "-18px" }} alt="" id="Grid4" ref={scrollRef2} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6} style={{ textAlign: "center", maxWidth: "396px", marginTop: "20px", color: "#86868b" }}>
                            <Typography>"Crafted with precision, our recipe algorithm ensures that every ingredient harmonizes perfectly, elevating flavors and textures to delight your taste buds with each bite."</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>


                        <Grid item xs={12} sm={12} md={12} lg={4} style={{ textAlign: "end", maxWidth: "396px", marginTop: "20px", marginLeft: "300px", color: "#86868b", position: "relative", left: "-49px" }}>
                            <Typography>
                            Connect with a global community of learners, educators, and experts through our collaborative features, including discussion forums, virtual classrooms, and peer-to-peer learning networks. Engage in meaningful discussions, share insights, and collaborate on projects to deepen your understanding and broaden your perspective.</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6} style={{
                            textAlign: "center", marginBottom: "20px"
                        }}>
                            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww" style={{ width: "400px", height: "auto", opacity: 0.8, marginTop: "-68px", marginRight: '304px' }} alt="" id="Grid5" ref={scrollRef3} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12} lg={4} style={{ textAlign: "center", marginTop: "52px", maxWidth: "500px" }}>
                            <Typography variant="h1" style={{ marginLeft: "102px", fontSize: "2.6rem", color: "#86868b" }}>
                                Nurture Your Education Skills
                                with Our Platform!
                            </Typography>

                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={8} style={{ marginTop: "149px", marginLeft: '312px', textAlign: "center" }}>
                            <img src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D" style={{ width: "400px", height: "366px", borderRadius: '39px' }} id="Grid7" ref={scrollRef7} alt="" />

                            <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D" style={{ width: "398px", height: "370px", marginLeft: "4px", borderRadius: "38px", position: "relative", top: "-96px" }} id="Grid9" ref={scrollRef9} alt=""/>

                            <img src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D" style={{
                                width: "404px", height: "376px", borderRadius: '46px', position: 'relative',
                                top: '-4px'
                            }} id="Grid10" ref={scrollRef10} alt="" />

                            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D" style={{ width: "379px", height: "366px", marginLeft: "4px", borderRadius: "49px", position: "relative", top: "-89px" }} id="Grid8" ref={scrollRef8} alt=""/>
                        </Grid>
                    </Grid>

                    <div id="text0" ref={scrollRef0} style={{ width: '578px', marginTop: "150px", marginBottom: "200px" }}>
                        <Typography variant="h2">Ready to get started?</Typography>
                        <center><Button variant="outlined" style={{ width: "150px", height: "50px", marginTop: "20px", marginBottom: "20px",fontFamily:"cursive"}} >Join with Us</Button></center>
                    </div>

                    <Footer />
                </div>
            </div>
        </div>
    )
}
