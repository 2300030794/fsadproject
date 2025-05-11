import React, { useState } from "react";
import { motion } from "framer-motion";
import "./DonateNowPage.css";

function DonateNowPage() {
  // State for donation entries (array of { type, quantity, totalAmount })
  const [donations, setDonations] = useState([{ type: "", quantity: 0, totalAmount: 0 }]);
  // State for showing summary modal
  const [showSummary, setShowSummary] = useState(false);

  const donationItems = [
    {
      type: "Clothes",
      cost: 100,
      label: "members",
      text: "Clothes",
      imageUrl: "https://media.istockphoto.com/id/1396160859/photo/baby-and-child-clothes-toys-in-box-second-hand-apparel-idea-circular-fashion-donation-charity.jpg?s=612x612&w=0&k=20&c=cjKWIeNfmEPVdQUBABIWSdGAvm5SUoEdQYB02XOI35c=",
    },
    {
      type: "Food_Veg",
      cost: 50,
      label: "people",
      text: "Food - Veg",
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Food_NonVeg",
      cost: 75,
      label: "people",
      text: "Food - Non-Veg",
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Money",
      cost: 1,
      label: "amount",
      text: "Money",
      imageUrl: "https://images.unsplash.com/photo-1550565118-3a701e361cd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Wheelchairs",
      cost: 500,
      label: "wheelchairs",
      text: "Wheelchairs",
      imageUrl: "https://images.unsplash.com/photo-1595432692113-7bf17b83c1a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Books",
      cost: 10,
      label: "books",
      text: "Books",
      imageUrl: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Stationery",
      cost: 5,
      label: "sets",
      text: "Stationery",
      imageUrl: "https://images.unsplash.com/photo-1452860606245-150d2cb718b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Sanitary",
      cost: 5,
      label: "sets",
      text: "Sanitary Items (For Girls)",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Animal_Milk",
      cost: 10,
      label: "units",
      text: "Animal Food - Milk",
      imageUrl: "https://images.unsplash.com/photo-1602470520998-f9a7c69e02b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Animal_Bones",
      cost: 15,
      label: "units",
      text: "Animal Food - Chicken Bones",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Animal_Stalk",
      cost: 8,
      label: "units",
      text: "Animal Food - Stalk",
      imageUrl: "https://images.unsplash.com/photo-1500595046743-cd271d6942ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Umbrellas",
      cost: 100,
      label: "umbrellas",
      text: "Umbrellas",
      imageUrl: "https://images.unsplash.com/photo-1552700633-1bc539718d33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Calculate total amount for a single donation
  const calculateTotal = (type, quantity) => {
    const item = donationItems.find((i) => i.type === type);
    if (!item) return 0;
    return item.cost * quantity;
  };

  // Update donation entry
  const updateDonation = (index, field, value) => {
    const updatedDonations = donations.map((donation, i) => {
      if (i !== index) return donation;
      const updated = { ...donation, [field]: value };
      if (field === "type" || field === "quantity") {
        updated.totalAmount = calculateTotal(updated.type, updated.quantity);
      }
      return updated;
    });
    setDonations(updatedDonations);
  };

  // Add a new donation entry
  const addDonation = () => {
    setDonations([...donations, { type: "", quantity: 0, totalAmount: 0 }]);
  };

  // Remove a donation entry
  const removeDonation = (index) => {
    setDonations(donations.filter((_, i) => i !== index));
  };

  // Calculate total across all donations
  const calculateGrandTotal = () => {
    return donations.reduce((sum, donation) => sum + donation.totalAmount, 0);
  };

  // Handle Proceed to Payment
  const handleProceed = () => {
    if (
      donations.every((d) => d.type && d.quantity > 0) &&
      !hasDuplicateTypes()
    ) {
      setShowSummary(true);
    } else {
      alert("Please select a donation type and enter a valid quantity for each entry, and ensure no duplicate donation types.");
    }
  };

  // Check for duplicate donation types
  const hasDuplicateTypes = () => {
    const types = donations.map((d) => d.type).filter((t) => t);
    return new Set(types).size !== types.length;
  };

  // Handle Confirm Payment (placeholder)
  const handleConfirmPayment = () => {
    alert(`Payment of $${calculateGrandTotal().toFixed(2)} confirmed!`);
    setShowSummary(false);
    setDonations([{ type: "", quantity: 0, totalAmount: 0 }]);
  };

  return (
    <div className="donate-now-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="donate-now-content"
      >
        <h1>Donate Now - Your Contribution Can Change a Life</h1>
        <p className="subtitle">
          Select one or more donation types to support our initiatives.
        </p>

        <section className="donation-form">
          {donations.map((donation, index) => (
            <div key={index} className="donation-entry">
              <div className="donation-options">
                {donationItems
                  .filter(
                    (item) =>
                      !donations.some(
                        (d, i) => d.type === item.type && i !== index
                      )
                  )
                  .map((item) => (
                    <div key={item.type} className="donation-item">
                      <div
                        className={`donation-image ${
                          donation.type === item.type ? "selected" : ""
                        }`}
                        style={{ backgroundImage: `url(${item.imageUrl})` }}
                        onClick={() => updateDonation(index, "type", item.type)}
                      >
                        <div className="image-overlay">
                          <span>{item.text}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              {donation.type && (
                <div className="donation-details">
                  <p>
                    Cost per{" "}
                    {donationItems.find((i) => i.type === donation.type).label ===
                    "amount"
                      ? "Dollar"
                      : donationItems.find((i) => i.type === donation.type)
                          .label}
                    : $
                    {donationItems.find((i) => i.type === donation.type).cost}
                  </p>
                  <label>
                    How many{" "}
                    {donationItems.find((i) => i.type === donation.type).label}{" "}
                    would you like to donate?
                    <input
                      type="number"
                      value={donation.quantity}
                      onChange={(e) =>
                        updateDonation(index, "quantity", parseInt(e.target.value) || 0)
                      }
                      min="0"
                    />
                  </label>
                  <p>Total Amount: ${donation.totalAmount.toFixed(2)}</p>
                  {donations.length > 1 && (
                    <button
                      className="btn-remove"
                      onClick={() => removeDonation(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
          <div className="form-actions">
            <button className="btn-secondary" onClick={addDonation}>
              Add Another Donation
            </button>
            <button className="btn-primary" onClick={handleProceed}>
              Proceed to Payment (UPI/QR)
            </button>
          </div>
        </section>

        {showSummary && (
          <motion.div
            className="summary-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Donation Summary</h2>
            <div className="summary-details">
              {donations.map((donation, index) => (
                <p key={index}>
                  {donationItems.find((i) => i.type === donation.type).text}: $
                  {donation.totalAmount.toFixed(2)}
                </p>
              ))}
              <h3>Total: ${calculateGrandTotal().toFixed(2)}</h3>
            </div>
            <div className="summary-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowSummary(false)}
              >
                Back
              </button>
              <button className="btn-primary" onClick={handleConfirmPayment}>
                Confirm Payment
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default DonateNowPage;