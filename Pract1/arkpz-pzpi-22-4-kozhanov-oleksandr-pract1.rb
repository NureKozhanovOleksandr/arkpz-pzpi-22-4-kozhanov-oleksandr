# Рекомендація: структура коду
# поганий приклад
class User; end
class Admin; end
class Product; end

# гарний приклад  
# app/models/user.rb
class User; end

# app/models/admin.rb
class Admin; end

# app/models/product.rb
class Product; end

# Рекомендація: форматування коду
# поганий приклад 
def hello_world() puts "Hello, world!" end  

# гарний приклад  
def hello_world  
  puts "Hello, world!"  
end

# Рекомендація: іменування
# поганий приклад  
class myclass; end
def mymethod; end
some_variable = 42

# гарний приклад  
class MyClass; end
def my_method; end
some_variable = 42

# Рекомендація: коментарі
# поганий приклад
# Ітеруємо масив  
array.each { |item| puts item }

# гарний приклад  
# Виводимо список продуктів  
products.each { |product| puts product.name }  

# Рекомендація: документування коду
# поганий приклад
def add(a, b)
  a + b
end

# гарний приклад  
# Adds two numbers together.
# @param [Integer] a The first number
# @param [Integer] b The second number
# @return [Integer] The sum of the two numbers
def add(a, b)
  a + b
end

# Рекомендація: test driven development
# поганий приклад
class Calculator
  def add(a, b)
    a + b
  end
end

# гарний приклад
# calculator.rb
class Calculator
  def add(a, b)
    a + b
  end
end

# calculator_spec.rb
RSpec.describe Calculator do
  it 'adds two numbers' do
    expect(Calculator.new.add(2, 3)).to eq(5)
  end
end

# Рекомендація: інструменти для забезпечення якості коду
# поганий приклад
def bad_example
puts "Hello, world!"
end

# гарний приклад
def good_example
  puts 'Hello, world!'
end

# RuboCop: ruby -rubocop
# SimpleCov: додаємо у spec_helper.rb
require 'simplecov'
SimpleCov.start