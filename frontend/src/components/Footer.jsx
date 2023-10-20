const Footer = () => {
  let githubIcon =
    "https://res.cloudinary.com/goalcrushers/image/upload/v1696278426/favicon-4.ico";
  let linkedinIcon =
    "https://res.cloudinary.com/goalcrushers/image/upload/v1696278432/favicon-5.ico";
  let portfolioIcon =
    "https://res.cloudinary.com/goalcrushers/image/upload/v1696278416/favicon-3.ico";
  let githubLink = "https://github.com/ReneeDeLuca";
  let linkedinLink = "https://www.linkedin.com/in/renee-deluca";
  let portfolioLink = "https://reneedeluca.dev";
  let imageLink = "https://www.freepik.com/author/catalyststuff";
  return (
    <footer className="fixed left-0 right-0 bottom-0 isolate w-full h-16 md:h-24">
      <section className="flex flex-col-reverse flex-end md:flex-row w-full h-full">
        <section className="flex basis-1/2 footer">
          <div className="flex w-full flex-col items-center justify-center md:py-4">
            <span className="text-xs mb-2 text-center font-normal text-gray-600 md:mb-0">
              © 2023 All rights reserved. Made with ❤️ by{" "}
              <a href={`${portfolioLink}`} />
              Renée DeLuca
            </span>
            <span className="text-xs mb-4 text-center font-normal text-gray-600 md:mb-0">
              Avatar art made by{" "}
              <a href={`${imageLink}`} title="CatalystStuff">
                CatalystStuff
              </a>
            </span>
          </div>
        </section>
        <section className="flex basis-1/2 footer">
          <div className="flex w-full flex-col items-center justify-center pt-1 md:py-4">
            <div className="inline-grid grid-cols-3 gap-4 justify-center">
              <div className="col-span-1">
                <a href={`${githubLink}`}>
                  <img
                    src={`${githubIcon}`}
                    className="opacity-80 transition-opacity hover:opacity-100"
                  />
                </a>
              </div>
              <div className="col-span-1">
                <a href={`${linkedinLink}`}>
                  <img
                    src={`${linkedinIcon}`}
                    className="opacity-80 transition-opacity hover:opacity-100"
                  />
                </a>
              </div>
              <div className="col-span-1">
                <a href={`${portfolioLink}`}>
                  <img
                    src={`${portfolioIcon}`}
                    className="opacity-80 transition-opacity hover:opacity-100"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </section>
    </footer>
  );
};

export default Footer;
