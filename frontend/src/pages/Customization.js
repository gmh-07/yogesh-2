import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Customization = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (!image || Object.values(formData).some((val) => val.trim() === "")) {
      toast.error("Please fill in all fields and upload an image!");
      return;
    }
  
    try {
      // Step 1: Create an order in the backend
      const res = await fetch(`http://localhost:8080/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 69900,  // ₹699 in paise
        }),
      });
  
      const data = await res.json();
      console.log("Order Created:", data);
  
      // Step 2: Initiate Razorpay Payment with the order ID
      const options = {
        key: "rzp_test_MwLIBIpHubJKtL",  // Your Razorpay Key
        amount: 69900,  // ₹699 in paise
        currency: "INR",
        name: "Custom T-Shirt",
        description: "Payment for a customized t-shirt",
        order_id: data.id,  // Use the order_id from the backend
        handler: async (response) => {
          console.log("Payment Response:", response);
  
          try {
            // Step 3: Verify payment in the backend
            const verifyRes = await fetch(`http://localhost:8080/api/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
  
            const verifyData = await verifyRes.json();
            if (verifyData.message) {
              toast.success(verifyData.message);
            }
          } catch (error) {
            console.log("Verification error:", error);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log("Error during payment initiation:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Customize Your T-Shirt
        </h2>

        {/* Image Upload */}
        <div className="relative w-full h-48 border border-gray-300 rounded-md flex justify-center items-center bg-gray-100 mb-4 overflow-hidden">
          {image ? (
            <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
          ) : (
            <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
              <span className="text-gray-500 text-sm">Upload Image</span>
              <input type="file" className="hidden" onChange={handleImageUpload} />
            </label>
          )}
        </div>

        {/* Form Fields */}
        <form className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
          />

          <textarea
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
          ></textarea>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              required
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              required
            />
          </div>

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
          />
        </form>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-gray-900 text-white py-3 mt-6 rounded-md text-center hover:bg-gray-800 transition"
        >
          Pay ₹699
        </button>

        <Toaster />
      </div>
    </div>
  );
};

export default Customization;
