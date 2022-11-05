import parse from "html-react-parser";
import { parse as nodeParser } from "node-html-parser";
import Error from "next/error";
import { infoTemplates } from "api-call";
import fetchStaticHTML from "api-call/fetchStaticHtml";
import Header5 from "@/components/Header/header5";
import { Fragment, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Head from "next/head";
import { metaTags } from "@/utils/constant";

// function PrivacyPolicy({ htmlText, error }) {
//   if (error) {
//     return <Error statusCode={404} />;
//   }
function PrivacyPolicy() {
  // const [htmlText1, setHtmlText1] = useState("");

  // useEffect(() => {
  //   callStaticPages();
  // }, []);

  // async function callStaticPages() {
  //   // let staticDataPath;
  //   // try {
  //   //   const response = await infoTemplates();
  //   //   staticDataPath = response?.dataObject;
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }

  //   var htmlText;
  //   try {
  //     // const { serverUrl, templateUrls } = staticDataPath;
  //     // const res = await fetchStaticHTML("/privacy_policy.html");
  //     const res = await fetchStaticHTML("/new_privacy_policy.html");
  //     // const res = await fetchStaticHTML(serverUrl + templateUrls.VERIFICATION);
  //     const html = res.data;
  //     const doc = nodeParser(html);
  //     const body = doc.querySelector("body");
  //     htmlText = body.innerHTML;
  //     setHtmlText1(htmlText);
  //   } catch (err) {
  //     console.log("getVerificationConent error", err);
  //   }
  // }

  return (
    <>
      <Head>
        <title>{metaTags.PRIVACY.title}</title>
        <meta name="description" content={metaTags.PRIVACY.description} />
        <meta property="og:title" content={metaTags.PRIVACY.title} />
        <meta
          property="og:description"
          content={metaTags.PRIVACY.description}
        />
      </Head>
      <Fragment>
        <Header5 title={"Privacy Policy"} />
        <main className="my-8">
          <section className="privacyPolicy pt-8 px-8">
            <div>
              <h2><span className="font-Roboto-Bold text-px ">Privacy Policy - Current [updated on August 01,
                2022]</span></h2>
              <p><span className="font-Roboto-Regular text-mx my-2">We care about your privacy and are committed to
                protecting your personal data. This privacy statement will inform you on how we handle your personal
                data, your privacy rights and how the law protects you. Please read this privacy statement carefully
                before using our Services.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">This privacy statement applies to your use of
                any products, services, content, features, technologies, or functions, and all related websites,
                mobile apps, mobile sites or other online platforms or applications offered to you by us
                (collectively the &quot;Services/Platform&quot;).</span></p>
              <h3><span className="font-Roboto-Semibold text-tx pb-2 pt-4">Who are we?</span></h3>
              <p><span className="font-Roboto-Regular text-mx my-2">MOBILICIS INDIA PRIVATE LIMITED, a company
                incorporated and registered in India, is the data controller for the personal data collected through
                this Platform. (&ldquo;we&rdquo;, &ldquo;our&rdquo; or &ldquo;us&rdquo;) take the security of your
                personal data very seriously and are committed to protecting and respecting the privacy of the users
                (&ldquo;you&rdquo; or &ldquo;your&rdquo;) of our ORUphones Website and App (the
                &ldquo;Platform&rdquo;).</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Interpretation and
                Definitions</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Interpretation</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">The words of which the initial letter is
                capitalized have meanings defined under the following conditions.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">The following definitions shall have the same
                meaning regardless of whether they appear in singular or in plural.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Definitions</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">For the purposes of this Privacy Policy:</span>
              </p>
              <ol>
                <li><span className="font-Roboto-Medium text-gx ">You means the individual accessing or using
                  the Service, or the company, or other legal entity on behalf of which such individual is
                  accessing or using the Service, as applicable.</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Company (referred to as either &quot;the
                  Company&quot;, &quot;I&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this
                  Agreement) refers to MOBILICIS INDIA PRIVATE LIMITED that owns website
                  ORUphones.com&nbsp;</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Affiliate means an entity that controls, is
                  controlled by or is under common control with a party, where &quot;control&quot; means ownership
                  of 50% or more of the shares, equity interest or other securities entitled to vote for election
                  of directors or other managing authority.</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Account means a unique account created for
                  You to access our Service or parts of our Service.</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Website refers to ORUphones, accessible
                  from https://www.oruphones.com</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Service refers to the Website.</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Country refers to: India</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Service Provider means any natural or legal
                  person who processes the data on behalf of the Company. It refers to third-party companies or
                  individuals employed by the Company to facilitate the Service, to provide the Service on behalf
                  of the Company, to perform services related to the Service or to assist the Company in analyzing
                  how the Service is used.</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Third-party Social Media Service refers to
                  any website or any social network website through which a User can log in or create an account
                  to use the Service.</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Personal Data is any information that
                  relates to an identified or identifiable individual.</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Cookies are small files that are placed on
                  Your computer, mobile device or any other device by a website, containing the details of Your
                  browsing history on that website among its many uses.</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Device means any device that can access the
                  Service such as a computer, a cellphone or a digital tablet.</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Usage Data refers to data collected
                  automatically, either generated by the use of the Service or from the Service infrastructure
                  itself (for example, the duration of a page visit).</span></li>
              </ol>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Collecting and Using Your Personal
                Data</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Types of Data Collected</strong></span>
              </p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Personal Data</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">While using Our Service, We may ask You to
                provide Us with certain personally identifiable information that can be used to contact or identify
                You. Personally identifiable information may include, but is not limited to:</span></p>
              <ol>
                <li><span className="font-Roboto-Medium text-gx ">Email address</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Phone number</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Address, State, Province, ZIP/Postal code,
                  City</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Usage Data</span></li>
              </ol>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Usage Data</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">Usage Data is collected automatically when using
                the Service.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">Usage Data may include information such as Your
                Device&apos;s Internet Protocol address (e.g. IP address), browser type, browser version, the pages
                of our Service that You visit, the time and date of Your visit, the time spent on those pages,
                unique device identifiers and other diagnostic data.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">When You access the Service by or through a
                mobile device, We may collect certain information automatically, including, but not limited to, the
                type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device,
                Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers
                and other diagnostic data.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">We may also collect information that Your
                browser sends whenever You visit our Service or when You access the Service by or through a mobile
                device.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Tracking Technologies and
                Cookies</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">We use Cookies and similar tracking technologies
                to track the activity on Our Service and store certain information. Tracking technologies used are
                beacons, tags, and scripts to collect and track information and to improve and analyze Our
                Service.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">You can instruct Your browser to refuse all
                Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may
                not be able to use some parts of our Service.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">Cookies can be &quot;Persistent&quot; or
                &quot;Session&quot; Cookies. Persistent Cookies remain on your personal computer or mobile device
                when You go offline, while Session Cookies are deleted as soon as You close your web browser. Learn
                more about cookies in the &quot;What Are Cookies&quot; article.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>We use both session and persistent
                Cookies for the purposes set out below:</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>1. Necessary / Essential
                Cookies</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">Type: Session Cookies</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">Administered by: Us</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">Purpose: These Cookies are essential to provide
                You with services available through the Website and to enable You to use some of its features. They
                help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the
                services that You have asked for cannot be provided, and We only use these Cookies to provide You
                with those services.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>2. Cookies Policy / Notice Acceptance
                Cookies</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">Type: Persistent Cookies</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">Administered by: Us</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">Purpose: These Cookies identify if users have
                accepted the use of cookies on the Website.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>3. Functionality Cookies</strong></span>
              </p>
              <p><span className="font-Roboto-Regular text-mx my-2">Type: Persistent Cookies</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">Administered by: Us</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">Purpose: These Cookies allow us to remember
                choices You make when You use the Website, such as remembering your login details or language
                preference. The purpose of these Cookies is to provide You with a more personal experience and to
                avoid You having to re-enter your preferences every time You use the Website.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">For more information about the cookies we use
                and your choices regarding cookies, please visit our Cookies Policy.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Use of Your Personal
                Data</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">The Company may use Personal Data for the
                following purposes:</span></p>
              <ol>
                <li><span className="font-Roboto-Medium text-gx ">To provide and maintain our Service,
                  including to monitor the usage of our Service.</span></li>
                <li><span className="font-Roboto-Medium text-gx ">To manage Your Account: to manage Your
                  registration as a user of the Service. The Personal Data You provide can give You access to
                  different functionalities of the Service that are available to You as a registered user.</span>
                </li>
                <li><span className="font-Roboto-Medium text-gx ">For the performance of a contract: the
                  development, compliance and undertaking of the purchase contract for the products, items or
                  services You have purchased or of any other contract with Us through the Service.</span></li>
                <li><span className="font-Roboto-Medium text-gx ">To contact You: To contact You by email,
                  telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile
                  application&apos;s push notifications regarding updates or informative communications related to
                  the functionalities, products or contracted services, including the security updates, when
                  necessary or reasonable for their implementation.</span></li>
                <li><span className="font-Roboto-Medium text-gx ">To provide You with news, special offers
                  and general information about other goods, services and events which we offer that are similar
                  to those that you have already purchased or enquired about unless You have opted not to receive
                  such information.</span></li>
                <li><span className="font-Roboto-Medium text-gx ">To manage Your requests: To attend and
                  manage Your requests to Us.</span></li>
                <li><span className="font-Roboto-Medium text-gx ">We may share your personal information in
                  the following situations:</span></li>
                <li><span className="font-Roboto-Medium text-gx ">With Service Providers: We may share Your
                  personal information with Service Providers to monitor and analyze the use of our Service, to
                  advertise on third party websites to You after You visited our Service, to contact You.</span>
                </li>
                <li><span className="font-Roboto-Medium text-gx ">For Business transfers: We may share or
                  transfer Your personal information in connection with, or during negotiations of, any merger,
                  sale of Company assets, financing, or acquisition of all or a portion of our business to another
                  company.</span></li>
                <li><span className="font-Roboto-Medium text-gx ">With Affiliates: We may share Your
                  information with Our affiliates, in which case we will require those affiliates to honor this
                  Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture
                  partners or other companies that We control or that are under common control with Us.</span>
                </li>
                <li><span className="font-Roboto-Medium text-gx ">With Business partners: We may share Your
                  information with Our business partners to offer You certain products, services or
                  promotions.</span></li>
                <li><span className="font-Roboto-Medium text-gx ">With other users: when You share personal
                  information or otherwise interact in the public areas with other users, such information may be
                  viewed by all users and may be publicly distributed outside. If You interact with other users or
                  register through a Third-Party Social Media Service, Your contacts on the Third-Party Social
                  Media Service may see You name, profile, pictures and description of Your activity. Similarly,
                  other users will be able to view descriptions of Your activity, communicate with You and view
                  Your profile.</span></li>
              </ol>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Retention of Your Personal
                Data</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">The Company will retain Your Personal Data only
                for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use
                Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we
                are required to retain your data to comply with applicable laws), resolve disputes, and enforce our
                legal agreements and policies.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">The Company will also retain Usage Data for
                internal analysis purposes. Usage Data is generally retained for a shorter period of time, except
                when this data is used to strengthen the security or to improve the functionality of Our Service, or
                We are legally obligated to retain this data for longer time periods.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Transfer of Your Personal
                Data</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">Your information, including Personal Data, is
                processed at the Company&apos;s operating offices and in any other places where the parties involved
                in the processing are located. It means that this information may be transferred to &mdash; and
                maintained on &mdash; computers located outside of Your state, province, country or other
                governmental jurisdiction where the data protection laws may differ than those from Your
                jurisdiction.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">Your consent to this Privacy Policy followed by
                Your submission of such information represents Your agreement to that transfer.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">The Company will take all steps reasonably
                necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy
                and no transfer of Your Personal Data will take place to an organization or a country unless there
                are adequate controls in place including the security of Your data and other personal
                information.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Disclosure of Your Personal
                Data</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Business Transactions</strong></span>
              </p>
              <p><span className="font-Roboto-Regular text-mx my-2">If the Company is involved in a merger,
                acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your
                Personal Data is transferred and becomes subject to a different Privacy Policy.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Law enforcement</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">Under certain circumstances, the Company may be
                required to disclose Your Personal Data if required to do so by law or in response to valid requests
                by public authorities (e.g. a court or a government agency).</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Other legal requirements</strong></span>
              </p>
              <p><span className="font-Roboto-Regular text-mx my-2">The Company may disclose Your Personal Data in
                the good faith belief that such action is necessary to:</span></p>
              <ul>
                <li><span className="font-Roboto-Medium text-gx ">Comply with a legal obligation</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Protect and defend the rights or property
                  of the Company</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Prevent or investigate possible wrongdoing
                  in connection with the Service</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Protect the personal safety of Users of the
                  Service or the public</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Protect against legal liability</span></li>
                <li><span className="font-Roboto-Medium text-gx ">Security of Your Personal Data</span></li>
              </ul>
              <p><span className="font-Roboto-Regular text-mx my-2">The security of Your Personal Data is important
                to Us, but remember that no method of transmission over the Internet, or method of electronic
                storage is 100% secure. While We strive to use commercially acceptable means to protect Your
                Personal Data, We cannot guarantee its absolute security.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Detailed Information on the Processing
                of Your Personal Data</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">Service Providers have access to Your Personal
                Data only to perform their tasks on Our behalf and are obligated not to disclose or use it for any
                other purpose.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Behavioral Remarketing</strong></span>
              </p>
              <p><span className="font-Roboto-Regular text-mx my-2">As described above, we use your Personal
                Information to provide you with targeted advertisements or marketing communications we believe may
                be of interest to you.
                {/* <!-- For more information about how targeted advertising works, you can visit the
                    Network Advertising Initiative&rsquo;s (&ldquo;NAI&rdquo;) educational page at
                    http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work. --> */}
              </span>
              </p>
              <p><span className="font-Roboto-Regular text-mx my-2">You can opt out of targeted advertising
                by:</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">INCLUDE OPT-OUT LINKS FROM WHICHEVER SERVICES
                BEING USED.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">COMMON LINKS INCLUDE:</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">FACEBOOK&nbsp;-
                https://www.facebook.com/settings/?tab=ads</span></p>
              {/* <!-- <p><span className="font-Roboto-Regular text-mx my-2">GOOGLE&nbsp;-
                    https://www.google.com/settings/ads/anonymous</span></p> --> */}
              <p><span className="font-Roboto-Regular text-mx my-2">BING&nbsp;-
                https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads</span></p>
              {/* <!-- <p><span className="font-Roboto-Regular text-mx my-2">PINTEREST&nbsp;-
                    http://help.pinterest.com/en/articles/personalization-and-data</span></p> --> */}
              <p><span className="font-Roboto-Regular text-mx my-2">Additionally, you can opt out of some of these
                services by visiting the Digital Advertising Alliance&rsquo;s opt-out portal at:
                http://optout.aboutads.info/.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Children&apos;s Privacy</strong></span>
              </p>
              <p><span className="font-Roboto-Regular text-mx my-2">Our Service does not address anyone under the
                age of 13. We do not knowingly collect personally identifiable information from anyone under the age
                of 13. If You are a parent or guardian and You are aware that Your child has provided Us with
                Personal Data, please contact Us. If We become aware that We have collected Personal Data from
                anyone under the age of 13 without verification of parental consent, We take steps to remove that
                information from Our servers.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">If We need to rely on consent as a legal basis
                for processing Your information and Your country requires consent from a parent, We may require Your
                parent&apos;s consent before We collect and use that information.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Links to Other Websites</strong></span>
              </p>
              <p><span className="font-Roboto-Regular text-mx my-2">Our Service may contain links to other websites
                that are not operated by Us. If You click on a third-party link, You will be directed to that third
                party&apos;s site. We strongly advise You to review the Privacy Policy of every site You
                visit.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">We have no control over and assume no
                responsibility for the content, privacy policies or practices of any third-party sites or
                services.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Changes to this Privacy
                Policy</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">We may update our Privacy Policy from time to
                time. We will notify You of any changes by posting the new Privacy Policy on this page.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">We will let You know via email and/or a
                prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last
                updated&quot; date at the top of this Privacy Policy.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">You are advised to review this Privacy Policy
                periodically for any changes. Changes to this Privacy Policy are effective when they are posted on
                this page.</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>Contact Us</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">If you have any questions about this Privacy
                Policy, You can contact us:</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">By email:&nbsp;contact@oruphones.com</span></p>
              <p><span className="font-Roboto-Regular text-mx my-2"><strong>MOBILICIS INDIA PRIVATE
                LIMITED</strong></span></p>
              <p><span className="font-Roboto-Regular text-mx my-2">Privacy Policy of
                https://www.oruphones.com</span></p>
            </div>
          </section>
        </main>
        <Footer />
      </Fragment>
    </>
  );
}

export default PrivacyPolicy;

// export async function getServerSideProps() {
//   let staticDataPath;
//   try {
//     const res = await infoTemplates();
//     staticDataPath = res?.dataObject;
//   } catch (error) {
//     console.log(error);
//     return {
//       props: {
//         error: true,
//       },
//     };
//   }

//   var htmlText;
//   try {
//     const { serverUrl, templateUrls } = staticDataPath;
//     const res = await fetchStaticHTML(serverUrl + templateUrls.PRIVATE_POLICY);
//     const html = res?.data || "";
//     const doc = nodeParser(html);
//     const body = doc.querySelector("body");
//     htmlText = body?.innerHTML || "";
//   } catch (err) {
//     console.log("PRIVATE_POLICY error", err);
//     return {
//       props: {
//         error: true,
//       },
//     };
//   }

//   return {
//     props: {
//       htmlText: htmlText,
//     },
//     // revalidate: 60*60*24, // In seconds
//   };
// }
