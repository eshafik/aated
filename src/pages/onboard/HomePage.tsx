import { Carousel, Collapse, Image, Typography } from "antd";

//https://mevrik-cloud.mevrik.com/apps_342/TYEE-342_XZH_aated-logo.png
//https://www.bproperty.com/blog/wp-content/uploads/2021/07/vrr.png

const HomePage = () => {
  return (
    <div className="flex flex-col gap-5 mt-4">
      <Carousel accessibility autoplay autoplaySpeed={1500}>
        <Image
          preview={false}
          height={500}
          width={"100%"}
          src="https://icsed.duet.ac.bd/images/icsedslider-1.jfif"
        />
        <Image
          preview={false}
          height={500}
          width={"100%"}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Dhaka_University_of_Engineering_Technology.jpg/800px-Dhaka_University_of_Engineering_Technology.jpg"
        />
        <Image
          preview={false}
          height={500}
          width={"100%"}
          src="https://www.duet.ac.bd/storage/slider/2024-11-24-1732457809-697.jpg"
        />
      </Carousel>
      <div className="grid grid-cols-12 gap-3 text-white">
        <div className="col-span-12 lg:col-span-4 h-96 bg-blue-500 p-5">
          <h1>About Us</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.</p>
          
        </div>
        <div className="col-span-12 lg:col-span-4 h-96 bg-blue-500 p-5">
          <h1>Our History</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.</p>
          
        </div>
        <div className="col-span-12 lg:col-span-4 h-96 bg-blue-600 p-5">
          <h1>Our Mission</h1>
          <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
      <div>
        <div className="text-center">
          <Typography.Title level={4} className="text-center">
            Frequently Asked Question
          </Typography.Title>
          <Typography.Text type="secondary" className="text-center">
            Your Queries Answered: Navigating Your Alumni Experience
          </Typography.Text>
        </div>
        <Collapse
          items={[
            {
              label: "Q.How do I Apply for membership?",
              children:
                "Online Application is easy! Simply navigate to the ' https://konnektios.net/duaa-up/' section on the website and follow the guided steps to apply for alumni Membership. Don't forget to provide accurate and updated information to stay connected with our community.",
            },
            {
              label: "Q.How can I update my contact information?",
              children:
                "Keeping your contact details current is essential. Please Contact DUAA office to update your contact information",
            },
            {
              label: "Q.What events are coming up, and how can I participate?",
              children:
                "Stay in the loop by visiting the 'Events' page on the website. You'll find a calendar showcasing upcoming events. Click on the event you're interested in to get more details and information on how to participate.",
            },
            {
              label:
                "Q.How can I contribute to the Alumni Scholarship Program?",
              children:
                "Making a difference is just a moment away. Just contact DUAA office to learn more about the program and find details on how to contribute. Your support can help shape the educational journey of aspiring scholars.",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default HomePage;
