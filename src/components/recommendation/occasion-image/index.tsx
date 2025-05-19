import { motion } from "framer-motion";
import Image from "next/image";

export const OccasionImage = {
  ThankYou: () => (
    <motion.div className="relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute z-10"
      >
        <Image
          src="/static/images/recommendation-when-thankyou-deco.png"
          alt="thankyou-deco"
          width={390}
          height={390}
          className="max-h-[min(40vh,390px) w-full object-contain"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        <Image
          src="/static/images/recommendation-when-thankyou-full.png"
          alt="thankyou-full"
          width={390}
          height={390}
          className="max-h-[min(40vh,390px)] w-full object-contain"
        />
      </motion.div>
    </motion.div>
  ),
  Birthday: () => (
    <motion.div className="relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.75 }}
        className="absolute z-10"
      >
        <Image
          src="/static/images/recommendation-when-birthday-deco.png"
          alt="birthday-deco"
          width={390}
          height={390}
          className="max-h-[min(40vh,390px) w-full object-contain"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.75 }}
      >
        <Image
          src="/static/images/recommendation-when-birthday-full.png"
          alt="birthday-full"
          width={390}
          height={390}
          className="max-h-[min(40vh,390px)] w-full object-contain"
        />
      </motion.div>
    </motion.div>
  ),
  Congratulation: () => (
    <motion.div className="relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.75 }}
        className="absolute z-10"
      >
        <Image
          src="/static/images/recommendation-when-congratulation-deco.png"
          alt="congratulation-deco"
          width={390}
          height={390}
          className="max-h-[min(40vh,390px) w-full object-contain"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.75 }}
      >
        <Image
          src="/static/images/recommendation-when-congratulation-full.png"
          alt="congratulation-full"
          width={390}
          height={390}
          className="max-h-[min(40vh,390px)] w-full object-contain"
        />
      </motion.div>
    </motion.div>
  ),
  Sorry: () => (
    <motion.div className="relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.75 }}
        className="absolute z-10"
      >
        <Image
          src="/static/images/recommendation-when-sorry-deco.png"
          alt="sorry-deco"
          width={390}
          height={390}
          className="max-h-[min(40vh,390px) w-full object-contain"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.75 }}
      >
        <Image
          src="/static/images/recommendation-when-sorry-full.png"
          alt="sorry-full"
          width={390}
          height={390}
          className="max-h-[min(40vh,390px)] w-full object-contain"
        />
      </motion.div>
    </motion.div>
  ),
  Support: () => (
    <motion.div className="relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.75 }}
        className="absolute z-10"
      >
        <Image
          src="/static/images/recommendation-when-support-deco.png"
          alt="support-deco"
          width={390}
          height={390}
          className="max-h-[min(40vh,390px) w-full object-contain"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.75 }}
      >
        <Image
          src="/static/images/recommendation-when-support-full.png"
          alt="support-full"
          width={390}
          height={390}
          className="max-h-[min(40vh,390px)] w-full object-contain"
        />
      </motion.div>
    </motion.div>
  ),
};
