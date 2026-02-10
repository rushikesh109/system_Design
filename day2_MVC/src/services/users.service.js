// In-memory database (will replace with real DB later)
let users = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25, city: "Mumbai" },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30, city: "Delhi" },
  {
    id: 3,
    name: "Charlie",
    email: "charlie@example.com",
    age: 28,
    city: "Bangalore",
  },
  { id: 4, name: "Diana", email: "diana@example.com", age: 22, city: "Mumbai" },
  { id: 5, name: "Eve", email: "eve@example.com", age: 35, city: "Pune" },
];

// Get all users with filtering and pagination
export const getAllUsers = (filters = {}) => {
  const { city, minAge, maxAge, page = 1, limit = 10 } = filters;
  
  let filteredUsers = [...users];
  
  // Filter by city
  if (city) {
    filteredUsers = filteredUsers.filter(user => 
      user.city && user.city.toLowerCase() === city.toLowerCase()
    );
  }
  
  // Filter by minimum age
  if (minAge) {
    filteredUsers = filteredUsers.filter(user => 
      user.age && user.age >= parseInt(minAge)
    );
  }
  
  // Filter by maximum age
  if (maxAge) {
    filteredUsers = filteredUsers.filter(user => 
      user.age && user.age <= parseInt(maxAge)
    );
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  
  return {
    users: paginatedUsers,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: filteredUsers.length,
      totalPages: Math.ceil(filteredUsers.length / limit)
    }
  };
};


// Get user by ID
export const getUserById = (id) => {
  return users.find(user => user.id === parseInt(id));
};

// Create new user
export const createUser = (userData) => {
  // Check if email already exists
  const existingUser = users.find(user => user.email === userData.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name: userData.name,
    email: userData.email,
    age: userData.age || null,
    city: userData.city || null
  };
  
  users.push(newUser);
  return newUser;
};

// PUT - Full update (replace entire user)
export const updateUser = (id, userData) => {
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  
  if (userIndex === -1) {
    return null;
  }
  
  // Check if email is being changed to an existing email
  if (userData.email && userData.email !== users[userIndex].email) {
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
  }
  
  users[userIndex] = {
    id: parseInt(id), // ID never changes
    name: userData.name,
    email: userData.email,
    age: userData.age || null,
    city: userData.city || null
  };
  
  return users[userIndex];
};


// PATCH - Partial update (update only provided fields)

export const patchUser = (id, userData) => {
    const userIndex = users.findIndex(user => user.id === parseInt(id));

    if(userIndex === -1){
        return null;
    }

    //Check if email is being changed to an existing mail

    if(userData.email && userData.email !== users[userIndex].email){
        const existingUser = users.find(user => user.email === userData.email);
        if(existingUser){
            throw new Error('Email already in use');
        }
    }

    //PATCH only updates provided fields;

    users[userIndex] = {
        ...users[userIndex],
        ...userData,
        id:parseInt(id)
    };
    return users[userIndex]
}
// Delete user
export const deleteUser = (id) => {
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  
  if (userIndex === -1) {
    return null;
  }
  
  const deletedUser = users[userIndex];
  users.splice(userIndex, 1);
  return deletedUser;
};
