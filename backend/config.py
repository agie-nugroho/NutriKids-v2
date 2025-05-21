# backend/config.py

CONFIG = {
    "MIN_BUDGET": 1000,
    "MAX_BUDGET": 50000,
    "AGE_GROUPS": {
        "0-6months": {"calories": [400, 600], "prohibited": ["Salt", "Honey"]},
        "6-12months": {"calories": [600, 900], "prohibited": ["Honey"]},
        "1-2years": {"calories": [900, 1200]},
        "3-5years": {"calories": [1200, 1600]},
        "6-8years": {"calories": [1400, 1800]},
        "9-12years": {"calories": [1600, 2200]}
    }
}