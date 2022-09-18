import mongoose from "mongoose";

export const AdminSchema = new mongoose.Schema({
  username: String,
  email: String,
  role: Number,
  status: Number,
  dateAdded: String,
  profilePicture: String,
  token: String,
  id: String,
});

export const CommentSchema = new mongoose.Schema({
  text: String,
  userEmail: String,
  dateAdded: String,
  status: Number,
  id: String,
});

export const EventSchema = new mongoose.Schema({
  headline: String,
  status: Number,
  userId: String,
  eventDate: String,
  dateAdded: String,
  description: String,
  image: String,
  location: {
    latitude: Number,
    longitude: Number,
  },
  address: {
    zipcode: String,
    street: String,
    city: String,
    state: String,
  },
  eventTime: String,
  id: String,
});

export const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  authenticated: Number,
  status: Number,
  token: String,
  id: String,
  role: Number,
});

export const AuthSchema = new mongoose.Schema({
  userId: String,
  password: String,
  otp: String,
});
