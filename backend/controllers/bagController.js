import Bag from '../models/bagModel.js'


export const addTobag = async (req, res) => {
    try {
        
        const { user, product, quantity } = req.body;

        // Check if the item already exists in the bag
        const existingItem = await Bag.findOne({ user, product })

        if (existingItem) {
            return res.status(200).json({
                success: true,
                message: 'Item already exists in the bag',
                bagItem: existingItem,
            });
        }

        const bagItem = new Bag({
            user,
            product,
            quantity,
        });

        await bagItem.save();
        
        return res.status(201).json({
            success: true,
            bagItem,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Failed to add item to Cart',
        });
    }
};

export const getBag = async (req, res) => {
    const userId = req.params.id
    try {
        const bagItems = await Bag.find({ user: userId }).populate('product')
        return res.status(200).json({
            success: true,
            bagItems
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Failed to get cart contents'
        })

    }
}

export const updateBagItem = async (req, res) => {
    try {
        const { itemId, quantity } = req.body

        const updatedBagItem = await Bag.findOneAndUpdate({product:itemId}, { quantity }, { new: true })
            
        return res.status(200).json({
            success: true,
            updatedBagItem
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update cart item'
        })
    }
}

export const removeBagItem = async (req, res) => {
    try {
        const itemId = req.params.id
        const removedBagItem = await Bag.findOne({product:itemId})

        if (!removedBagItem) {
            return res.status(404).json({ 
                success:false,
                message: 'Cart item not found' 
            });
        }

        await removedBagItem.deleteOne()

        return res.status(200).json({
            success: true,
            message: 'Item removed from cart'
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to remove item from cart'
        })
    }
}