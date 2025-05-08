require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test "index" do
    get "/"
    assert_equal 200, status

    assert_match "XHR: false", @response.body
  end

  test "index XHR" do
    get "/", xhr: true
    assert_equal 200, status

    assert_match "XHR: true", @response.body
  end
end
