import React from 'react'

const About = () => {
    const values = [
        {
          id: 1,
          title: "Integrity",
          description:
            "We uphold honesty and transparency in every transaction, ensuring fairness for both buyers and sellers.",
        },
        {
          id: 2,
          title: "Innovation",
          description:
            "We continually enhance our platform with cutting-edge technology and features to provide users with a seamless and efficient auction process.",
        },
        {
          id: 3,
          title: "Community",
          description:
            "We believe in building a vibrant and supportive community where users can connect, collaborate, and thrive.",
        },
        {
          id: 4,
          title: "Customer-Centric Approach",
          description:
            "Your satisfaction is our priority. We’re dedicated to providing exceptional service and support to meet your unique needs.",
        },
        {
            id: 5,
            title: "Sustainability",
            description:
              "By promoting the resale of goods, we encourage sustainable consumption and a circular economy.",
          },
      ];
  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] gap-8 flex flex-col min-h-screen py-6 justify-center bg-gray-50">
  <div>
    <h1 className="text-[#A8D532] text-2xl font-bold mb-4 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
      About Us
    </h1>
    <p className="text-lg text-gray-700 leading-relaxed">
      Welcome to BidEase, your trusted online auction platform where buyers and sellers connect in a seamless, transparent, and innovative environment. At BidEase, we’re transforming the way people discover, sell, and acquire unique items and services.
    </p>
  </div>

  <div>
    <h3 className="text-gray-800 text-xl font-semibold mb-3 min-[480px]:text-xl md:text-2xl lg:text-3xl">
      Our Mission
    </h3>
    <p className="text-lg text-gray-700 leading-relaxed">
      To empower individuals and businesses by providing a user-friendly auction platform that fosters trust, transparency, and opportunity. We aim to make online auctions accessible, exciting, and secure for everyone.
    </p>
  </div>

  <div>
    <h3 className="text-gray-800 text-xl font-semibold mb-3 min-[480px]:text-xl md:text-2xl lg:text-3xl">
      Our Values
    </h3>
    <ul className="list-inside list-disc text-lg text-gray-700 leading-relaxed pl-5">
      {values.map((element) => (
        <li className="mb-3" key={element.id}>
          <span className="text-black font-semibold">{element.title}</span>:{" "}
          {element.description}
        </li>
      ))}
    </ul>
  </div>

  <div>
    <h3 className="text-gray-800 text-xl font-semibold mb-3 min-[480px]:text-xl md:text-2xl lg:text-3xl">
      Our Story
    </h3>
    <p className="text-lg text-gray-700 leading-relaxed">
      BidEase began as a humble college project born out of a shared vision among four passionate and driven students for connecting people with unique and valuable items.
    </p>
  </div>

  <div>
    <h3 className="text-gray-800 text-xl font-semibold mb-3 min-[480px]:text-xl md:text-2xl lg:text-3xl">
      Join Us
    </h3>
    <p className="text-lg text-gray-700 leading-relaxed">
      Whether you’re looking to sell a prized possession, bid on your next great find, or simply explore what’s out there, BidEase is your gateway to an exciting world of possibilities.
      <br />
      Let’s build a future where auctions are for everyone, everywhere.
    </p>
  </div>

  <div>
    <p className="text-[#A8D532] text-lg font-semibold">
      Thank you for choosing BidEase. We look forward to being a part of your auction journey!
    </p>
  </div>
</section>
    </>
  )
}

export default About;
