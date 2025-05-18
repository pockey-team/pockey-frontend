import { motion } from "framer-motion";
import Image from "next/image";

export const OccasionImage = {
  Thx: () => (
    <motion.div className="relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute z-10"
      >
        <Image
          src="/static/images/recommendation-when-thx-deco.png"
          alt="thx-deco"
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
          src="/static/images/recommendation-when-thx-full.png"
          alt="thx-full"
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
  Congrat: () => (
    <motion.div className="relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.75 }}
        className="absolute z-10"
      >
        <Image
          src="/static/images/recommendation-when-congrat-deco.png"
          alt="congrat-deco"
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
          src="/static/images/recommendation-when-congrat-full.png"
          alt="congrat-full"
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
  Fighting: () => (
    <motion.div className="relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.75 }}
        className="absolute z-10"
      >
        <Image
          src="/static/images/recommendation-when-fighting-deco.png"
          alt="fighting-deco"
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
          src="/static/images/recommendation-when-fighting-full.png"
          alt="fighting-full"
          width={390}
          height={390}
          className="max-h-[min(40vh,390px)] w-full object-contain"
        />
      </motion.div>
    </motion.div>
  ),
};
