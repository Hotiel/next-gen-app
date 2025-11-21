import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Usser", required: true },
    body: { type: String, required: true, maxlenght: 200 },
    createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Usser", required: true },
    username: {type: String, required: true },
    body: { type: String, required: true, maxlenght: 300 },
    upvotes: [{type: mongoose.Schema.Types.ObjectId, ref: "Usser"}],
    comments: [commentSchema],
}, { timestamps: true });

postSchema.pre("save", async function(next) {
    const count = await mongoose.model("Post").countDocuments();
    if (count >=20) {
        const oldest = await mongoose.model("Post").findOne().sort({createdAt: 1 });
        if (oldest) await oldest.deleteOne();
    }
    next();
});

export default mongoose.model("Post", postSchema);