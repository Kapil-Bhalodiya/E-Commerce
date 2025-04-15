const Coupon = require('../models/coupons.model');
const { ApiError } = require('../utils/ApiError');
const logger = require('../utils/logger');

class CouponService {
  async applyCoupon(code, orderSubTotal, orderItems) {
    const coupon = await Coupon.findOne({ code, isActive: true });
    if (!coupon) {
      throw new ApiError('Invalid or inactive coupon', 400);
    }

    // Check expiry
    if (coupon.expiryDate < new Date()) {
      throw new ApiError('Coupon has expired', 400);
    }

    // Check usage limit
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      throw new ApiError('Coupon usage limit reached', 400);
    }

    // Check minimum order amount
    if (orderSubTotal < coupon.minOrderAmount) {
      throw new ApiError(`Minimum order amount is ${coupon.minOrderAmount}`, 400);
    }

    // Check product applicability
    if (coupon.applicableProducts.length > 0) {
      const itemProductIds = orderItems.map(item => item.productId.toString());
      const isApplicable = coupon.applicableProducts.some(productId =>
        itemProductIds.includes(productId.toString())
      );
      if (!isApplicable) {
        throw new ApiError('Coupon not applicable to these products', 400);
      }
    }

    // Calculate discount
    let discountAmount = 0;
    if (coupon.discountType === 'fixed') {
      discountAmount = coupon.discountValue;
    } else {
      discountAmount = (coupon.discountValue / 100) * orderSubTotal;
      if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
        discountAmount = coupon.maxDiscountAmount;
      }
    }

    // Update coupon usage
    coupon.usedCount += 1;
    await coupon.save();

    logger.info(`Coupon ${code} applied successfully`);
    return { coupon, discountAmount };
  }
}

module.exports = new CouponService();