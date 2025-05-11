import React, { useState } from "react";
import { motion } from "framer-motion";
import "./DonateNowPage.css";

function DonateNowPage() {
  const [donations, setDonations] = useState([{ type: "", quantity: 0, totalAmount: 0 }]);
  const [showSummary, setShowSummary] = useState(false);

  const donationItems = [
    {
      type: "Clothes", cost: 100, label: "members", text: "Clothes",
      imageUrl: "https://media.istockphoto.com/id/1396160859/photo/baby-and-child-clothes-toys-in-box-second-hand-apparel-idea-circular-fashion-donation-charity.jpg?s=612x612&w=0&k=20&c=cjKWIeNfmEPVdQUBABIWSdGAvm5SUoEdQYB02XOI35c=",
    },
    {
      type: "Food_Veg", cost: 50, label: "people", text: "Food - Veg",
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Food_NonVeg", cost: 75, label: "people", text: "Food - Non-Veg",
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Money", cost: 1, label: "amount", text: "Money",
      imageUrl: "https://images.unsplash.com/photo-1550565118-3a701e361cd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Wheelchairs", cost: 500, label: "wheelchairs", text: "Wheelchairs",
      imageUrl: "https://images.unsplash.com/photo-1595432692113-7bf17b83c1a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Books", cost: 10, label: "books", text: "Books",
      imageUrl: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Stationery", cost: 5, label: "sets", text: "Stationery",
      imageUrl: "https://images.unsplash.com/photo-1452860606245-150d2cb718b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Sanitary", cost: 5, label: "sets", text: "Sanitary Items (For Girls)",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Animal_Milk", cost: 10, label: "units", text: "Animal Food - Milk",
      imageUrl: "https://images.unsplash.com/photo-1602470520998-f9a7c69e02b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Animal_Bones", cost: 15, label: "units", text: "Animal Food - Chicken Bones",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Animal_Stalk", cost: 8, label: "units", text: "Animal Food - Stalk",
      imageUrl: "https://images.unsplash.com/photo-1500595046743-cd271d6942ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "Umbrellas", cost: 100, label: "umbrellas", text: "Umbrellas",
      imageUrl: "https://images.unsplash.com/photo-1552700633-1bc539718d33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  const calculateTotal = (type, quantity) => {
    const item = donationItems.find((i) => i.type === type);
    return item ? item.cost * quantity : 0;
  };

  const updateDonation = (index, field, value) => {
    const updated = donations.map((d, i) => {
      if (i !== index) return d;
      const updatedEntry = { ...d, [field]: value };
      if (field === "type" || field === "quantity") {
        updatedEntry.totalAmount = calculateTotal(updatedEntry.type, updatedEntry.quantity);
      }
      return updatedEntry;
    });
    setDonations(updated);
  };

  const addDonation = () => {
    setDonations([...donations, { type: "", quantity: 0, totalAmount: 0 }]);
  };

  const removeDonation = (index) => {
    setDonations(donations.filter((_, i) => i !== index));
  };

  const calculateGrandTotal = () => donations.reduce((sum, d) => sum + d.totalAmount, 0);

  const hasDuplicateTypes = () => {
    const types = donations.map((d) => d.type).filter(Boolean);
    return new Set(types).size !== types.length;
  };

  const handleProceed = () => {
    if (donations.every((d) => d.type && d.quantity > 0) && !hasDuplicateTypes()) {
      setShowSummary(true);
    } else {
      alert("Please select a valid donation and ensure no duplicates.");
    }
  };

  const handleConfirmPayment = () => {
    alert(`Payment of $${calculateGrandTotal().toFixed(2)} confirmed!`);
    setShowSummary(false);
    setDonations([{ type: "", quantity: 0, totalAmount: 0 }]);
  };

  return (
    <div className="donate-now-container">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="donate-now-content">
        <h1>Donate Now - Your Contribution Can Change a Life</h1>
        <p className="subtitle">Select one or more donation types to support our initiatives.</p>

        <section className="donation-form">
          {donations.map((donation, index) => (
            <div key={index} className="donation-entry">
              <div className="donation-options">
                {donationItems
                  .filter((item) => !donations.some((d, i) => d.type === item.type && i !== index))
                  .map((item) => (
                    <div key={item.type} className="donation-item">
                      <div
                        className={`donation-image ${donation.type === item.type ? "selected" : ""}`}
                        style={{ backgroundImage: `url(${item.imageUrl})` }}
                        onClick={() => updateDonation(index, "type", item.type)}
                      >
                        <div className="image-overlay"><span>{item.text}</span></div>
                      </div>
                    </div>
                  ))}
              </div>
              {donation.type && (
                <div className="donation-details">
                  <p>
                    Cost per {donationItems.find((i) => i.type === donation.type).label}: $
                    {donationItems.find((i) => i.type === donation.type).cost}
                  </p>
                  <label>
                    How many{" "}
                    {donationItems.find((i) => i.type === donation.type).label}?
                    <input
                      type="number"
                      value={donation.quantity}
                      min="0"
                      onChange={(e) => updateDonation(index, "quantity", parseInt(e.target.value) || 0)}
                    />
                  </label>
                  <p>Total Amount: ${donation.totalAmount.toFixed(2)}</p>
                  {donations.length > 1 && (
                    <button className="btn-remove" onClick={() => removeDonation(index)}>Remove</button>
                  )}
                </div>
              )}
            </div>
          ))}
          <div className="form-actions">
            <button className="btn-secondary" onClick={addDonation}>Add Another Donation</button>
            <button className="btn-primary" onClick={handleProceed}>Proceed to Payment (UPI/QR)</button>
          </div>
        </section>

        {showSummary && (
          <motion.div className="summary-modal" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="summary-content">
              <h2>Donation Summary</h2>
              <ul>
                {donations.map((d, i) => {
                  const item = donationItems.find((x) => x.type === d.type);
                  return (
                    <li key={i}>
                      {item.text} - {d.quantity} {item.label} = ${d.totalAmount.toFixed(2)}
                    </li>
                  );
                })}
              </ul>
              <p><strong>Total Donation Amount: ${calculateGrandTotal().toFixed(2)}</strong></p>
              <button className="btn-confirm" onClick={handleConfirmPayment}>Confirm & Pay</button>
              <button className="btn-cancel" onClick={() => setShowSummary(false)}>Cancel</button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default DonateNowPage;
