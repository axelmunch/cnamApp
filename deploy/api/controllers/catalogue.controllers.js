exports.get = (req, res) => {
  const catalogue = [
    { ref: "A", titre: "Smartphone", prix: 899.99 },
    { ref: "B", titre: "Laptop", prix: 619.99 },
    { ref: "C", titre: "Headphones", prix: 299.99 },
    { ref: "D", titre: "Smartwatch", prix: 199.99 },
    { ref: "E", titre: "Robot vacuum cleaner", prix: 335.88 },
    { ref: "F", titre: "VR headset", prix: 349.99 },
    { ref: "G", titre: "Bicycle", prix: 600 },
    { ref: "H", titre: "Printer", prix: 120 },
    { ref: "I", titre: "Drone", prix: 199.99 },
    { ref: "J", titre: "Shower gel", prix: 12.5 },
  ];

  res.setHeader("Content-Type", "application/json");

  res.send(catalogue);
};
