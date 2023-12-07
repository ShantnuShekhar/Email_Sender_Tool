const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,  
  },
});

const isValidEmail = (email,replyTo) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email,replyTo);
};

const isValidCc = (cc) => {
    if (!Array.isArray(cc)) {
      return false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return cc.every((email) => emailRegex.test(email));
  };


const sendEmail = async (email, subject, html, attachments = [], replyTo,cc) => {
  try {
    const mailOptions = {
      from: process.env.FROM,
      email,
      subject,
      html,
      attachments,
      replyTo,
      cc: Array.isArray(cc) && isValidCc(cc) ? cc : undefined
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.messageId);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

fs.readFile('emails.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading JSON file: ', err);
    return;
  }

  try {
    const recipients = JSON.parse(data);

    recipients.forEach(({ name, email, subject, replyTo,cc }) => {
      if (!isValidEmail(email)) {
        console.log(`Invalid email address for ${name}: ${email}`);
        return; 
      }
      if (!isValidEmail(replyTo)) {
        console.log(`Invalid reply to address for ${name}: ${email}`);
        return; 
      }
      if (!isValidCc(cc)) {
        console.log(`Invalid CC to address for ${name}: ${email}`);
        return; 
      }

      const html = `
      <body>
        <table cellpadding="0" cellspacing="0" border="0" role="presentation" bgcolor="white" width="595"
            style="background-color: white; width: 595px; max-width: 100%; border-spacing: 0; font-family: Roboto; margin-left: auto; margin-right: auto;">

            <tr>
                <td width="100.00%" style="padding-bottom: 4.03px; width: 100%;">
                    <table cellpadding="0" cellspacing="0" border="0" role="presentation">

                        <tr>
                            <td>
                                <img src="https://strapi.techladd.com/uploads/Group_21070_1_d0afe9e251.png" width="595px"
                                    alt="Header_img"/>
                            </td>
                        </tr>

                    </table>
                </td>

            </tr>

            <tr>
                <td align="left" class="remove-gutter" style="padding-top: 0px; padding-left: 18px">
                    <table cellpadding="0" cellspacing="0" border="0" role="presentation"
                        style="border-spacing: 0; margin-top: -30px;">
                        <tr>
                            <td valign="middle" style="padding-right: 5px">
                                <div bgcolor="#4b68af" height="20" width="5"
                                    style="background-color: #4b68af; height: 20px; width: 5px">
                                </div>

                            </td>
                            <td valign="middle" style="padding-left: 8px">
                                <p
                                    style="font-size: 20px; font-weight: 400; color: black; margin: 0; padding: 0; line-height: 20px;">
                                    About TechLadd</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <tr>
                <td align="left" width="100.00%" style="padding-top: 20px; padding-bottom: 15px; width: 100%">
                    <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100.00%"
                        style="width: 100%; border-spacing: 0">
                        <tr>
                            <td class="remove-gutter" style="padding-left: 17px; padding-right: 33px">
                                <p width="100.00%"
                                    style="font-size: 14px; font-weight: 400; text-align: left; line-height: 18px; color: #4b4b4b; margin: 0; padding: 0; width: 100%">
                                    Techladd has the DNA of IIT &amp; IIM Alumni who have worked with leading
                                    startups. The team came together with one vision to bring a lean,
                                    user-centric approach to product innovation and software development.
                                    <br />
                                    Our passion lies in finding solutions for ambitious business professionals
                                    facing technological constraints. Our team of product design engineers is
                                    dedicated to designing, developing, and delivering unparalleled results.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <tr>
                <td align="left" class="remove-gutter" style="padding-top: 8px; padding-bottom: 10px; padding-left: 18px">
                    <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-spacing: 0">
                        <tr>
                            <td valign="middle" style="padding-right: 5px">
                                <div bgcolor="#4b68af" height="20" width="5"
                                    style="background-color: #4b68af; height: 20px; width: 5px"></div>
                            </td>
                            <td valign="middle" width="560" style="padding-left: 8px; width: 560px">
                                <p
                                    style="font-size: 20px; font-weight: 400; color: black; margin: 0; padding: 0; line-height: 20px; ">
                                    Founder Details
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <tr>
                <td align="left" width="100%" style="padding-top: 10px; padding-bottom: 2.25px; width: 100%">
                    <img src="https://strapi.techladd.com/uploads/Group_21071_1_976ddd8c21.png" width="100%"
                        alt="founder_details"/>
                </td>
            </tr>


            <tr>
                <td align="left" width="100%" style="padding-top: 2.25px; padding-bottom: 1.5px; width: 100%">
                    <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%"
                        style="width: 100%; margin-left:0px">
                        <tr>
                            <td class="remove-gutter" style="padding-left: 169px; ">
                                <p style="font-size: 11px; font-weight: 400; color: black; margin: 0; padding: 0;">
                                    Dilip Sah
                                    <a href="http://linkedin.com/in/dilipksah">
                                        <img src="https://strapi.techladd.com/uploads/Group_20256_1_0c86a9d195.png"
                                            width="14.00" style="width: 14px; display: inline-block; margin-left: 5px;"/>
                                    </a>
                                </p>



                            </td>
                            <td class="remove-gutter" style="padding-left: 23px; ">
                                <p style="font-size: 11px; font-weight: 400; color: black; margin: 0; padding-left: 25px;">
                                    Pradyuman Roy
                                    <a href="https://www.linkedin.com/in/pradyroy/">
                                        <img src="https://strapi.techladd.com/uploads/Group_20256_1_0c86a9d195.png"
                                            width="14.00" style="width: 14px; display: inline-block; margin-left: 5px;"/>
                                    </a>
                                </p>



                            </td>

                            <td class="remove-gutter" style=" padding-left: 60px; padding-right: 35px;">
                                <p style="font-size: 11px;  color: black; margin: 0; padding-right: 20px;">
                                    Kapil Verma
                                    <a href="http://linkedin.com/in/kapil-verma-827057a">
                                        <img src="https://strapi.techladd.com/uploads/Group_20256_1_0c86a9d195.png"
                                            width="14.00" style="width: 14px; display: inline-block; margin-left: 5px;"/>
                                    </a>

                                </p>



                            </td>
                        </tr>
                    </table>
                </td>
            </tr>


            <tr>
                <td align="left" width="100%" style="padding-top: 1.5px; padding-bottom: 10px; width: 100%">
                    <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%" style="width: 100%">
                        <tr>
                            <td class="remove-gutter" style="padding-left: 110px; padding-right: 20px; text-align: center;">

                                <p
                                    style="font-size: 11px; font-weight: 400; color: black; margin: 0; padding: 0; line-height: 13px;">
                                    Founder | CEO
                                    <br/>IIT Kanpur
                                    <span
                                        style="border-left: 0.7px solid black; padding-left: 3.65px; padding-right: 3.65px;"></span>
                                    IIM Ahmedabad
                                </p>

                            </td>

                            <td class="remove-gutter" style="text-align: center;">

                                <p
                                    style="font-size: 11px; font-weight: 400; color: black; margin: 0; padding: 0; line-height: 13px; margin-left: 15px;">
                                    Co-Founder | VP(Tech)
                                    <br/>IIT Mumbai


                                </p>

                            </td>

                            <td class="remove-gutter"
                                style="padding-left: 25px; padding-right: 20px; text-align:center; margin-left: 30px;">

                                <p
                                    style="font-size: 11px; font-weight: 400; color: black; margin: 0; padding: 0; line-height: 13px; padding-right:59; margin-right:15px">
                                    Co-Founder | CMO
                                    <br/>IIT Kanpur
                                    <span
                                        style="border-left: 0.7px solid black; padding-left: 1.65px; padding-right: 1.65px;"></span>
                                    University Of Michigan
                                </p>

                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <tr>
                <td align="left" class="remove-gutter" style="padding-top: 10px; padding-bottom: 16px; padding-left: 18px">
                    <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-spacing: 0">
                        <tr>
                            <td valign="middle" style="padding-right: 5px">
                                <div bgcolor="#4b68af" height="20" width="5"
                                    style="background-color: #4b68af; height: 20px; width: 5px"></div>
                            </td>
                            <td valign="middle" width="560" style="padding-left: 8px; width: 560px">
                                <p
                                    style="font-size: 20px; font-weight: 400; color: black; margin: 0; padding: 0; line-height: 20px;">
                                    Our Services</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="left" class="remove-gutter" style="padding-top:10px; padding-bottom: 16px; padding-left: 18px">
                    <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-spacing: 0">
                        <tr>
                            <td>
                                <a href="https://www.techladd.com/services/mobile-development-solution"
                                    style="text-decoration: none;">
                                    <figure style="text-align: center;">
                                        <img src="https://strapi.techladd.com/uploads/Group_21061_8255e6542b.png"
                                            alt="Mob_App"/>
                                        <figcaption
                                            style=" font: roboto; font-weight: 400; size: 15px; line-height: 15px; max-width: 100px; white-space: nowrap; ">
                                            Mobile App <br/> Development </figcaption>
                                    </figure>
                                </a>
                            </td>
                            <td>
                                <a href="https://www.techladd.com/services/web-app-development"
                                    style="text-decoration: none;">
                                    <figure style="text-align: center;">
                                        <img src="https://strapi.techladd.com/uploads/Group_21062_f59174751a.png"
                                            alt="Web_App" style="size: 100%;"/>
                                        <figcaption
                                            style=" font: roboto; font-weight: 400; size: 15px; line-height: 15px; max-width: 100px; white-space: nowrap;">
                                            Web App<br/> Development</figcaption>
                                    </figure>
                                </a>
                            </td>
                            <td>
                                <a href="https://www.techladd.com/services/ai-machine-learning-development "
                                    style="text-decoration: none;">
                                    <figure style="text-align: center;">
                                        <img src="https://strapi.techladd.com/uploads/Group_21063_75b72f486d.png"
                                            alt="Generative_AI" style="size: 100%;"/>
                                        <figcaption style=" font: roboto; font-weight: 400; size: 15px; line-height: 15px;">
                                            Generative AI</figcaption>
                                    </figure>
                                </a>
                            </td>
                            <td>
                                <a href="https://www.techladd.com/services/cto-consulting-and-fundraising"
                                    style="text-decoration: none;">
                                    <figure style="text-align: center;">
                                        <img src="https://strapi.techladd.com/uploads/Group_21064_4e04f30ce2.png"
                                            alt="Tech_Consulting" style="size: 100%;"/>
                                        <figcaption style=" font: roboto; font-weight: 400; size: 15px; line-height: 15px;">
                                            Tech Consulting</figcaption>
                                    </figure>
                                </a>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <a href="https://www.techladd.com/services/data-science-and-big-data-analytics"
                                    style="text-decoration: none;">
                                    <figure style="text-align: center;">
                                        <img src="https://strapi.techladd.com/uploads/Group_21068_a9a97b3dd8.png"
                                            alt="Mob_App"/>
                                        <figcaption style=" font: roboto; font-weight: 400; size: 15px; line-height: 15px;">
                                            Data Analytics</figcaption>
                                    </figure>
                                </a>
                            </td>
                            <td>
                                <a href="https://www.techladd.com/services/ui-ux-design-and-development"
                                    style="text-decoration: none;">
                                    <figure style="text-align: center;">
                                        <img src="https://strapi.techladd.com/uploads/Group_21067_6b16dedc21.png"
                                            alt="Web_App" style="size: 100%;"/>
                                        <figcaption style=" font: roboto; font-weight: 400; size: 15px; line-height: 15px;">
                                            UX/UI Design</figcaption>
                                    </figure>
                                </a>
                            </td>
                            <td>
                                <a href="https://www.techladd.com/services/cloud-devops-services"
                                    style="text-decoration: none;">
                                    <figure style="text-align: center;">
                                        <img src="https://strapi.techladd.com/uploads/Group_21066_228a8b80d2.png"
                                            alt="Generative_AI" style="size: 100%;"/>
                                        <figcaption style=" font: roboto; font-weight: 400; size: 15px; line-height: 15px;">
                                            Cloud Services</figcaption>
                                    </figure>
                                </a>
                            </td>
                            <td>
                                <a href="https://www.techladd.com/services/tech-staffing-solution"
                                    style="text-decoration: none;">
                                    <figure style="text-align: center;">
                                        <img src="https://strapi.techladd.com/uploads/Group_21065_e2c615cec4.png"
                                            alt="Tech_Consulting" style="size: 100%;"/>
                                        <figcaption
                                            style=" font: roboto; font-weight: 400; size: 15px; line-height: 15px; max-width: 100px; white-space: nowrap;">
                                            Staff<br/> Augumentation</figcaption>
                                    </figure>
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <tr>
                <td align="left" class="remove-gutter" style="padding-top: 42px; padding-bottom: 9px; padding-left: 18px">
                    <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-spacing: 0">
                        <tr>
                            <td valign="middle" style="padding-right: 5px">
                                <div bgcolor="#4b68af" height="20" width="5"
                                    style="background-color: #4b68af; height: 20px; width: 5px"></div>
                            </td>
                            <td valign="middle" width="560" style="padding-left: 8px; width: 560px">
                                <p
                                    style="font-size: 20px; font-weight: 400; color: black; margin: 0; padding: 0; line-height: 20px; mso-line-height-rule: exactly">
                                    Our Clients</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <tr>
                <td align="left" width="100.00%" style="padding-top: 9px; padding-bottom: 14.88px; width: 100%">
                    <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100.00%"
                        style="width: 100%; border-spacing: 0">
                        <tr>
                            <td class="remove-gutter" style="padding-left: 17px; padding-right: 33px">
                                <p width="100.00%"
                                    style="font-size: 14px; font-weight: 400; text-align: left; line-height: 18px; color: #4b4b4b;  margin: 0; padding: 0; width: 100%">
                                    We have worked with multiple startups in their journey from small startups
                                    to becoming a Unicorn. We have effectively completed even the most
                                    challenging projects, earning the trust and receiving positive testimonials
                                    from our clients.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <tr>
                <td width="100.00%" style="padding-top: 14.88px; padding-bottom: 16px; width: 100%">
                    <table class="responsive" cellpadding="0" cellspacing="0" border="0" role="presentation" width="100.00%"
                        style="width: 100%; border-spacing: 0">
                        <tr>
                            <td valign="top" style="padding-top: 2.25px; padding-left: 8px; min-width: 98px">
                                <img src="https://strapi.techladd.com/uploads/26_1_309d4fd80c.png" width="98.00"
                                    style="border: none; max-width: initial; width: 98px; display: block" alt="accupredict"/>
                            </td>
                            <td valign="top" style="padding-left: 3.75px; min-width: 0.5px">
                                <div height="60" style="height: 60px; border-left: 0.5px solid #cccccc"></div>
                            </td>
                            <td valign="top"
                                style="padding-top: 2.25px; padding-bottom: 8.25px; padding-left: 2.75px; min-width: 129px">
                                <img src="https://strapi.techladd.com/uploads/20_2cf3ac0b9e.png" width="129.00"
                                    style="border: none; max-width: initial; width: 129px; display: block" alt="godrej"/>
                            </td>
                            <td valign="top" style="padding-left: 3.75px; min-width: 1.25px">
                                <div height="60" style="height: 60px; border-left: 0.5px solid #cccccc"></div>
                            </td>
                            <td valign="top"
                                style="padding-top: 9.25px; padding-bottom: 15.25px; padding-left: 8px; padding-right: 2.75px; min-width: 85px">
                                <img src="https://strapi.techladd.com/uploads/19_275c173820.png" alt="easyloan"/>
                            </td>
                            <td valign="top" width="100.00%" style="padding-left: 8px; width: 100%; min-width: -7.5px">
                                <div height="60" style="height: 60px; border-left: 0.5px solid #cccccc"></div>
                            </td>
                            <td valign="middle" style="padding-left: 8px; padding-right: 4.75px; min-width: 86px">
                                <img src="https://strapi.techladd.com/uploads/21_51be58470b.png" width="86.00"
                                    style="border: none; max-width: initial; width: 86px; display: block" alt="spirh"/>
                            </td>
                            <td valign="top" width="2.25" style="padding-left: 8px; width: 2.25px; min-width: 2.25px">
                                <div height="60" style="height: 60px; border-left: 0.5px solid #cccccc"></div>
                            </td>
                            <td valign="top" width="125"
                                style="padding-top: 19.25px; padding-bottom: 12.25px; padding-left: 8px; width: 125px; min-width: 125px">
                                <img src="https://strapi.techladd.com/uploads/image_93_656347b9b0.png" width="92.00"
                                    style="border: none; max-width: initial; width: 92px; display: block" alt="yappes"/>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <tr>
                <td width="100.00%" style="padding-top: 21.75px; padding-bottom: 5.5px; width: 100%">
                    <table cellpadding="0" cellspacing="0" border="0" role="presentation" bgcolor="#4b68af" width="100.00%"
                        style="background-color: #4b68af; padding-top: 17.88px; padding-bottom: 18px; width: 100%; border-spacing: 0">
                        <tr>
                            <td align="center" valign="middle" width="100.00%" style="width: 100%">
                                <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100.00%"
                                    style="width: 100%; border-spacing: 0">
                                    <tr>
                                        <td class="remove-gutter" style="padding-left: 28px; padding-right: 28px">
                                            <table align="center" cellpadding="0" cellspacing="0" border="0"
                                                role="presentation" width="100.00%" style="width: 100%; border-spacing: 0">
                                                <tr>
                                                    <td align="center" width="100.00%"
                                                        style="padding-bottom: 7.72px; width: 100%">
                                                        <p width="100.00%"
                                                            style="font-size: 12px; font-weight: 400; text-align: center; color: white; margin: 0; padding: 0; width: 100%">
                                                            We will keep you informed and ahead of the curve.
                                                            Look out for our monthly newsletters, consisting of
                                                            all new technology trends on Digital Platforms, AI,
                                                            Block chain , Metaverse much more.</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="center" style="padding-top: 7.72px">
                                                        <div role="button" width="102" style="width: 102px">
                                                            <a href="https://www.techladd.com/services/web-app-development"
                                                                target="_blank" rel="noopener noreferrer" bgcolor="#fffdfd"
                                                                style="border: none; border-radius: 4px; background-color: #fffdfd; cursor: pointer; line-height: 26px; display: block; text-align: center; text-decoration: none">
                                                                <span
                                                                    style="font-size: 11px; font-weight: 400; color: black; text-decoration: none;">Explore
                                                                    More</span>
                                                            </a>

                                                        </div>

                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <tr>
                <table style="margin-left: 30px;"> 
                    <tr>
                        <td valign="middle" style="padding-left: 14px; min-width: 12px">
                            <a href="http://www.techladd.com" style="text-decoration: none;">
                                <span style="margin-left: 0px;"><img
                                        src="https://strapi.techladd.com/uploads/Vector_3_177de52e06.png" width="12.00"
                                        height="12.00" alt="phone" /></span>
                                <span> www.techladd.com</span>
                            </a>
                        </td>
                        <td>
                            <span style="margin-left: 30px;"><img
                                    src="https://strapi.techladd.com/uploads/Vector_4_b88440f7cc.png" width="12.00"
                                    height="12.00" alt="phone" /></span>
                            <span> +91 9850570525</span>
                        </td>
                        <td>
                            <a href="mailto:hello@techladd.com" style="text-decoration: none;">
                                <span style="margin-left: 30px;"><img
                                        src="https://strapi.techladd.com/uploads/Vector_5_482e482897.png" width="12.00"
                                        height="12.00" alt="phone" /></span>
                                <span> hello@techladd.com</span>
                            </a>
                        </td>
                        <td>
                            <span style="margin-left: 40px;"><img
                                    src="https://strapi.techladd.com/uploads/Vector_5_482e482897.png" width="12.00"
                                    height="12.00" alt="phone" /></span>
                            <span> Unsubscribe</span>
                        </td>
                    </tr>
                </table>
            </tr>
        </table>
        



        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500" />
    </body>`;


      const attachments = [];
      console.log(`Email sent to ${name}`);

      sendEmail(email, subject, html, attachments, replyTo,Array.isArray(cc) ? cc : [cc]);
    });
  } catch (parseError) {
    console.error('Error parsing JSON: ', parseError);
  }
});
