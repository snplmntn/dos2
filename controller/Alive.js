const alive = async (req, res) => {
  try {
    const timestamp = Date.now();

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString();

    console.log("I AM ALIVE", formattedDate);
    return res.status(200).json({ message: "I AM ALIVE" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

module.exports = {
  alive,
};
