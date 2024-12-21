// API endpoint for db.json
const apiUrl = "http://localhost:3000/users";

// Container for the application
const appContainer = document.getElementById("app-container");

// Dashboard Templates
const dashboards = {
  user: `
    <div class="dashboard-section dashboard-user">
      <h2 class="dashboard-header">Welcome, User!</h2>
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Available Services</h5>
              <p class="card-text">Browse and book cleaning or maintenance services.</p>
              <button class="btn btn-primary">View Services</button>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Booking History</h5>
              <p class="card-text">View your past and upcoming appointments.</p>
              <button class="btn btn-secondary">View History</button>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-success mt-4">Edit Profile</button>
    </div>
  `,
  cleaner: `
    <div class="dashboard-section dashboard-cleaner">
      <h2 class="dashboard-header">Welcome, Cleaner!</h2>
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Assigned Tasks</h5>
              <p class="card-text">View and manage your cleaning assignments.</p>
              <button class="btn btn-primary">View Tasks</button>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Task History</h5>
              <p class="card-text">Review completed tasks and performance ratings.</p>
              <button class="btn btn-secondary">View History</button>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-success mt-4">Edit Profile</button>
    </div>
  `,
  admin: `
    <div class="dashboard-section dashboard-admin">
      <h2 class="dashboard-header">Welcome, Admin!</h2>
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Manage Users</h5>
              <p class="card-text">Add, edit, or remove users and cleaners.</p>
              <button class="btn btn-primary">Manage Users</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Service Bookings</h5>
              <p class="card-text">Approve or deny service bookings.</p>
              <button class="btn btn-secondary">View Bookings</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Cleaner Performance</h5>
              <p class="card-text">Review tasks completed and ratings.</p>
              <button class="btn btn-success">View Performance</button>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-danger mt-4">Manage Services</button>
    </div>
  `
};

// Render Dashboard
function renderDashboard(role) {
  appContainer.innerHTML = dashboards[role] || `<h3>Dashboard not found.</h3>`;
}

// Handle Signup
document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const role = document.getElementById("signupRole").value;
  
    if (!role) {
      alert("Please select a role.");
      return;
    }
  
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role })
    });
  
    if (response.ok) {
      alert("Signup successful! Please log in.");
      document.querySelector("#signupModal .btn-close").click();
    } else {
      alert("Error signing up. Try again.");
    }
  });
  

// Handle Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
  
    try {
      const response = await fetch(apiUrl);
      const users = await response.json();
  
      const user = users.find((u) => u.email === email && u.password === password);
  
      if (user) {
        console.log("User found:", user); // Check if the user is found
        alert(`Welcome, ${user.name}!`);
        document.querySelector("#loginModal .btn-close").click(); // Close the modal
        console.log("User role:", user.role); // Ensure role is logged
        renderDashboard(user.role); // Render the dashboard based on the role
      } else {
        alert("Invalid email or password. Try again.");
      }
    } catch (error) {
      console.error("Error during login process:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  });
  
  
//   function renderDashboard(role) {
//   console.log("Rendering dashboard for role:", role); // Debug log
//   if (!dashboards[role]) {
//     console.error("Dashboard not found for role:", role);
//     appContainer.innerHTML = `<h3>Dashboard not found.</h3>`;
//   } else {
//     appContainer.innerHTML = dashboards[role];
//   }
// }


  
function renderDashboard(role) {
    console.log("Rendering dashboard for role:", role); // Add this log to check if renderDashboard is called
    if (!dashboards[role]) {
      console.error("Dashboard not found for role:", role);
      appContainer.innerHTML = `<h3>Dashboard not found.</h3>`;
    } else {
      appContainer.innerHTML = dashboards[role];
    }
  }

    // Function to navigate to the form and populate fields
    function navigateToForm(serviceName, servicePrice) {
        // Populate the form fields with service details
        document.getElementById('serviceName').value = serviceName;
        document.getElementById('servicePrice').value = servicePrice;

        // Scroll to the form section
        const formSection = document.getElementById('booking-form');
        formSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Function to handle booking submission
    function bookService() {
        // Retrieve form inputs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;

        // Validate required fields
        if (!name || !email || !phone || !date) {
            alert("Please fill in all required fields.");
            return;
        }

        // Show success message
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';

        // Clear the form
        document.getElementById('bookingForm').reset();

        // Hide success message after 3 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }

    // Toggle Sidebar visibility when the icon is clicked
document.getElementById('sidebarToggle').addEventListener('click', function () {
  const sidebar = document.getElementById('sidebar');
  if (sidebar.style.display === 'none' || sidebar.style.display === '') {
      sidebar.style.display = 'block';
  } else {
      sidebar.style.display = 'none';
  }
});

// Function to show the selected dashboard
function showDashboard(dashboard) {
  // Hide all dashboards
  document.querySelectorAll('.dashboard').forEach(d => {
      d.style.display = 'none';
  });

  // Show the selected dashboard
  document.getElementById(dashboard + 'Dashboard').style.display = 'block';
}

// Function to book a service (User)
function bookService(serviceName, price) {
  alert(`Service "${serviceName}" booked for $${price}`);
}

// Function to add a new service (Admin)
function addService() {
  const serviceName = document.getElementById('serviceName').value;
  const servicePrice = document.getElementById('servicePrice').value;
  if (serviceName && servicePrice) {
      alert(`Service "${serviceName}" added for $${servicePrice}`);
  } else {
      alert("Please fill in all fields.");
  }
}

// Function to remove a service (Admin)
function removeService(serviceName) {
  alert(`Service "${serviceName}" removed.`);
}

// Function to show the form for adding a new service (Admin)
function showAddServiceForm() {
  document.getElementById('addServiceForm').style.display = 'block';
}


  