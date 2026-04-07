'use client'

import { useState } from 'react'
import { MessageCircle, Phone, X } from 'lucide-react'

export function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleChatClick = () => {
    setShowChat(!showChat)
    setIsOpen(false)
  }

  const handleCallClick = () => {
    window.location.href = 'tel:+1234567890'
  }

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Action Buttons - Show when menu is open */}
        <div
          className={`flex flex-col gap-3 transition-all duration-300 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          {/* Chat Button */}
          <button
            onClick={handleChatClick}
            className="group flex items-center gap-3 bg-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full px-4 py-3 hover:scale-105"
            aria-label="Open Chat"
          >
            <span className="text-sm font-semibold text-foreground whitespace-nowrap">Chat with us</span>
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
          </button>

          {/* Call Button */}
          <button
            onClick={handleCallClick}
            className="group flex items-center gap-3 bg-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full px-4 py-3 hover:scale-105"
            aria-label="Call Us"
          >
            <span className="text-sm font-semibold text-foreground whitespace-nowrap">Call us now</span>
            <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center group-hover:bg-green-700 transition-colors">
              <Phone className="h-5 w-5 text-white" />
            </div>
          </button>
        </div>

        {/* Main Toggle Button */}
        <button
          onClick={toggleMenu}
          className={`h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-110 ${
            isOpen ? 'bg-slate-600 hover:bg-slate-700' : 'bg-primary hover:bg-primary/90'
          }`}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Chat Widget Overlay */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowChat(false)}
          />

          {/* Chat Widget */}
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md h-[500px] sm:h-[600px] flex flex-col animate-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Sidonn Support</h3>
                  <p className="text-xs text-white/80">We typically reply in minutes</p>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="h-8 w-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50">
              <div className="space-y-4">
                {/* Welcome Message */}
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[80%]">
                    <p className="text-sm">
                      Hello! 👋 Welcome to Sidonn. How can we help you with your logistics automation needs today?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t bg-white rounded-b-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <button
                  className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-colors"
                  aria-label="Send message"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-white"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Powered by Sidonn Support
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
