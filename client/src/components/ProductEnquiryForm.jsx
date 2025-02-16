import React from 'react'
import { ModalBody, ModalContent, ModalFooter } from '@/components/ui/animated-modal'
import EnquiryForm from './EnquiryForm'

const ProductEnquiryForm = () => {
    return (
        <div>
            <ModalBody>
                <ModalContent>
                    <h4 className="mb-8 text-lg font-bold text-center md:text-2xl text-neutral-100">
                        Get a{" "}
                        <span className="px-1 py-0.5 rounded-md bg-neutral-800 border-neutral-700 border ">
                            Product Enquiry
                        </span>{" "}
                        now!
                    </h4>
                    <div className="flex items-center justify-center">
                        <EnquiryForm />
                    </div>

                </ModalContent>
                <ModalFooter className="gap-4">
                    <button className="px-2 py-1 text-sm text-white bg-black border border-black rounded-md w-28">
                        Cancel
                    </button>
                    <button className="px-2 py-1 text-sm text-black bg-white border border-black rounded-md w-28">
                        Book Now
                    </button>
                </ModalFooter>
            </ModalBody>

        </div>
    )
}

export default ProductEnquiryForm
