// racfce ---- short cut

const Contact = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl p-4 m-4 ">Contact Us Page</h1>
      <form>
        <input type="text"
          className="border border-black p-2 m-2"
          placeholder="name"
        />
        <input type="text"
          className="border border-black p-2 m-2"
          placeholder="message" />

        <button className="border border-black p-2 m-2 bg-gray-100 rounded-lg hover:bg-gray-200">Submit</button>
      </form>
    </div>
  );
};

export default Contact;