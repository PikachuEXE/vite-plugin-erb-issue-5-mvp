require "memo_wise"

class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  module XhrDetection
    prepend ::MemoWise

    def self.included(base)
      base.class_eval do
        helper_method :xhr?
      end
    end

    memo_wise def xhr?
      request.xhr?
    end
  end
  module SpecialXhrDetection
    def self.included(base)
      base.class_eval do
        include XhrDetection
        include InstanceMethods
      end
    end

    module InstanceMethods
      def xhr?
        request.method == "GET" && request.xhr?
      end
    end
  end
  include SpecialXhrDetection
end
