Feature: Count

	As a user,
	I want a counter,
	so that I can count things.

	Scenario: The user wants to count things

		Given the user is on the root page
		When the user clicks the button
		Then the count is "1"
		When the user clicks the button
		Then the count is "2"

