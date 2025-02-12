import { Schema, Document, model } from "mongoose";

interface Profile extends Document {
  accountId: string;
  profiles: any;
}

const profileSchema = new Schema<Profile>({
  accountId: { type: String, required: true },
  profiles: { type: Object, required: true },
});

const Profile = model<Profile>("profiles", profileSchema);

export default Profile;
