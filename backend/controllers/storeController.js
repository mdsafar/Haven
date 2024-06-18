import Store from "../models/storeModel.js";




export const CreateStore = async (req, res) => {
    try {
        const user = req.user

        if (!user) return res.status(400).json({ message: "User not found" })

        const storeExists = await Store.findOne({ email: user.email })

        if (storeExists) {
            return res.status(400).json({
                message: "Store already exists"
            })
        }

        const store = new Store({ user: user._id, ...req.body });
        await store.save({});

        res.status(200).json({
            success: true,
            store,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }

}

export const GetStores = async (req, res) => {
    try {
        const stores = await Store.find({});
        res.status(200).json({
            success: true,
            stores
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const GetMyStore = async (req, res) => {
    try {
        const user = req.user._id

        if (!user) return res.status(400).json({ message: "User not found" })

        const store = await Store.findOne({ user });

        if (!store) {
            return res.status(404).json({
                success: false,
                message: "Store not found!!"
            })
        }

        res.status(200).json({
            success: true,
            store
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const UpdateStore = async (req, res) => {
    try {
        let store = await Store.findById(req.params.id)
        if (!store) {
            return res.status(404).json({
                success: false,
                message: "Store not found with this Id"
            })
        }
        store = await Store.findByIdAndUpdate(store._id, req.body,
            { new: true, runValidators: true, useFindAndModify: false })

        res.status(200).json({
            success: true,
            store
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const GetStoreDetails = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id)
        if (!store) {
            return res.status(404).json({
                success: false,
                message: "Store not found with this Id"
            })
        }
        res.status(200).json({
            success: true,
            store
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const DeleteStore = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id)
        if (!store) {
            return res.status(404).json({
                success: false,
                message: "Store not found with this Id"
            })
        }

        if (req.user._id.toString() !== store.user.toString()) {
            return res.status(401).json({
                success: false,
                message: "You Have No Permission To Delete Store"
            })
        }

        await store.deleteOne()
        res.status(200).json({
            success: true,
            message: "Deleted Successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}