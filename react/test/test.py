import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import allure

@pytest.fixture
def driver():
    options = webdriver.ChromeOptions()
    # options.add_argument("--headless") # Раскомментируйте при необходимости запуск без графического интерфейса
    driver = webdriver.Chrome(options=options)
    driver.maximize_window()
    yield driver
    driver.quit()

def attach_screenshot(driver, description):
    """Вспомогательная функция для прикрепления скриншота в Allure-отчет"""
    allure.attach(
        driver.get_screenshot_as_png(),
        name=description,
        attachment_type=allure.attachment_type.PNG
    )

@allure.feature("Authentication")
@allure.story("Login feature")
@allure.title("Тест 1: Успешная авторизация пользователя")
def test_successful_login(driver):
    with allure.step("Открыть главную страницу SauceDemo"):
        driver.get("https://www.saucedemo.com/")
    
    with allure.step("Ввести логин и пароль стандартного пользователя"):
        driver.find_element(By.ID, "user-name").send_keys("standard_user")
        driver.find_element(By.ID, "password").send_keys("secret_sauce")
    
    with allure.step("Нажать кнопку Login"):
        driver.find_element(By.ID, "login-button").click()
        
    with allure.step("Проверить успешность входа по наличию каталога товаров"):
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "inventory_list"))
        )
        assert "inventory.html" in driver.current_url
        
    attach_screenshot(driver, "Скриншот после успешного входа")

@allure.feature("Checkout Process")
@allure.story("Order Form submission")
@allure.title("Тест 2: Добавление товара и заполнение формы заказа")
def test_checkout_form(driver):
    with allure.step("Авторизоваться в системе"):
        driver.get("https://www.saucedemo.com/")
        driver.find_element(By.ID, "user-name").send_keys("standard_user")
        driver.find_element(By.ID, "password").send_keys("secret_sauce")
        driver.find_element(By.ID, "login-button").click()
        
    with allure.step("Добавить рюкзак в корзину"):
        add_to_cart_btn = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "add-to-cart-sauce-labs-backpack"))
        )
        add_to_cart_btn.click()
        
    with allure.step("Перейти в корзину и начать оформление (Checkout)"):
        driver.find_element(By.CLASS_NAME, "shopping_cart_link").click()
        driver.find_element(By.ID, "checkout").click()
        
    with allure.step("Заполнить форму персональными данными"):
        driver.find_element(By.ID, "first-name").send_keys("Ivan")
        driver.find_element(By.ID, "last-name").send_keys("Ivanov")
        driver.find_element(By.ID, "postal-code").send_keys("190000")
        driver.find_element(By.ID, "continue").click()
        
    with allure.step("Завершить оформление заказа (Finish)"):
        driver.find_element(By.ID, "finish").click()
        success_header = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "complete-header"))
        )
        assert "Thank you for your order!" in success_header.text
        
    attach_screenshot(driver, "Скриншот успешного оформления заказа")

@allure.feature("Navigation and Sorting")
@allure.story("Catalog interaction and clicks")
@allure.title("Тест 3: Сортировка товаров и переход по ссылке детализации")
def test_sorting_and_navigation(driver):
    with allure.step("Авторизоваться в системе"):
        driver.get("https://www.saucedemo.com/")
        driver.find_element(By.ID, "user-name").send_keys("standard_user")
        driver.find_element(By.ID, "password").send_keys("secret_sauce")
        driver.find_element(By.ID, "login-button").click()
        
    with allure.step("Отсортировать товары по цене (от меньшей к большей)"):
        sort_dropdown = driver.find_element(By.CLASS_NAME, "product_sort_container")
        sort_dropdown.click()
        driver.find_element(By.XPATH, "//option[@value='lohi']").click()
        
    with allure.step("Кликнуть по ссылке товара для перехода на страницу с деталями"):
        product_link = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "item_2_title_link"))
        )
        product_link.click()
        
    with allure.step("Убедиться, что открыта страница товара"):
        back_btn = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "back-to-products"))
        )
        assert back_btn.is_displayed()
        
    with allure.step("Вернуться назад к списку товаров"):
        back_btn.click()
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "inventory_list"))
        )
        
    attach_screenshot(driver, "Скриншот после возврата из деталей товара")
