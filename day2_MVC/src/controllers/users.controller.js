import * as userService from "../services/users.service.js";

export const getUsers = (req, res, next) => {
  try {
    const filters = {
      city: req.query.city,
      minAge: req.query.minAge,
      maxAge: req.query.maxAge,
      page: req.query.page || 1,
      limit: req.query.limit || 10,
    };

    const result = userService.getAllUsers(filters);

    res.status(200).json({
      success: true,
      data: result.users,
      meta: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

// GET /users/:id
export const getUserById = (req, res, next) => {
  try {
    const user = userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          message: `User with ID ${req.params.id} not found`,
        },
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// POST /users
export const createUser = (req, res, next) => {
  try {
    const newUser = userService.createUser(req.body);

    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    if (error.message === "User with this email already exists") {
      return res.status(400).json({
        success: false,
        error: {
          message: error.message,
        },
      });
    }
    next(error);
  }
};

// PUT /users/:id
export const updateUser = (req, res, next) => {
  try {
    const updatedUser = userService.updateUser(req.params.id, req.body);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: {
          message: `User with ID ${req.params.id} not found`,
        },
      });
    }

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    if (error.message === "Email already in use") {
      return res.status(400).json({
        success: false,
        error: {
          message: error.message,
        },
      });
    }
    next(error);
  }
};

//PATCH /users/:id - Partial update (only provided fields)

export const patchUser = (req, res, next) => {
  try {
    const patchedUser = userService.patchUser(req.params.id, req.body);

    if (!patchedUser) {
      return res.status(404).json({
        success: false,
        error: {
          message: `User with ID ${req.params.id} not found`,
        },
      });
    }
    res.status(200).json({
      success: true,
      data: patchedUser,
      message: `User with ID ${req.params.id} updated partially`,
    });
  } catch (error) {
    if (error.message === "Email already in use") {
      return res.status(400).json({
        success: false,
        error: {
          message: error.message,
        },
      });
    }
    next(error);
  }
};

// DELETE /users/:id
export const deleteUser = (req, res, next) => {
  try {
    const deletedUser = userService.deleteUser(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        error: {
          message: `User with ID ${req.params.id} not found`,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};
