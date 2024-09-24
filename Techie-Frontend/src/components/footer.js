import React from 'react'
import "../styles/footer.scss"
function Footer() {
  return (
    <div className="foter container ">
    <div className="techie-div">
                   <div className="techie-logo-container">
                       <img className="techie-logo" src="https://res.cloudinary.com/cliqtick/image/upload/v1692600339/icons/logo-techie-_IE_uqk1bc.png"/>
                   </div>
                   <div className="sm-div">
                      <div><img className="sm-img" src="https://res.cloudinary.com/cliqtick/image/upload/v1686120164/techei_panda_website_images/Facebook-Icon_orvpxl.png" /></div>
                      <div><img className="sm-img" src="https://res.cloudinary.com/cliqtick/image/upload/v1686120165/techei_panda_website_images/LinkedIn-Icon_zcra9f.png" /></div>
                      <div> <img className="sm-img" src="https://res.cloudinary.com/cliqtick/image/upload/v1686120164/techei_panda_website_images/Instagram-Icon_ijchts.png" /></div>
                   </div>
                   <div className="url" > https://techiepanda.in/</div>
                   <div className="url"> +91 720 740 1718</div>
    </div>
    <div className="techie-res">
       <div className="resources" >Site Map</div>
       <div  className="resources">Resources</div>
       <div  className="resources">Blog</div>
       <div className='resources'>FAQ</div>
    </div>
    <div className="techie-about">
    <div className='techie-about-1'>Techie Panda</div>
       <div className="techie-about-inner">
      
        <div>About Us</div>
        <div>Meet Techie Panda</div>
        <div>Job Assistance</div>
        <div>Refund Policy</div>
        <div>Privacy and Cookie Policy</div>
        <div>Terms and Conditions</div>
       </div>
    </div>
    <div className="techie-map">
        <div><iframe  className="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.0386556256476!2d83.23167277586289!3d17.74281769246731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3967274842f4df%3A0x9711e68b73419d51!2sTechiepanda!5e0!3m2!1sen!2sin!4v1696832682466!5m2!1sen!2sin"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"/></div>
    </div>
</div>
  )
}

export default Footer