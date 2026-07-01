import jsPDF from "jspdf";

function InvoiceButton({ order }) {

  const downloadInvoice = () => {

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("FarmDirect Invoice", 20, 20);

    doc.setFontSize(12);

    doc.text(`Order ID : ${order._id}`, 20, 40);

    doc.text(`Status : ${order.status}`, 20, 50);

    doc.text(`Customer : ${order.user?.name}`, 20, 60);

    doc.text(`Email : ${order.user?.email}`, 20, 70);

    let y = 90;

    doc.text("Products", 20, y);

    y += 10;

    order.items.forEach((item) => {

      doc.text(
        `${item.product.name}   x${item.quantity}   ₹${item.price}`,
        20,
        y
      );

      y += 10;

    });

    y += 10;

    doc.setFontSize(14);

    doc.text(
      `Total Amount : ₹${order.totalAmount}`,
      20,
      y
    );

    doc.save(`Invoice-${order._id}.pdf`);

  };

  return (

    <button
      className="btn btn-success mt-3"
      onClick={downloadInvoice}
    >
      Download Invoice
    </button>

  );

}

export default InvoiceButton;