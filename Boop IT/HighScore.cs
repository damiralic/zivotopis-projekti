using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class HighScore : MonoBehaviour
{
    public Text highScore;
    public Slider slider;
    void Start()
    {
        highScore.text = PlayerPrefs.GetInt("HighScore").ToString();
        if (ScoreCounter.scoreValue > 100)
        {
            slider.GetComponent<ProgressBar>().IncrementProgress(0.10f);
            Currency.currencyValue += 5;
            PlayerPrefs.SetInt("Currency", PlayerPrefs.GetInt("Currency") + Currency.currencyValue);
        }
        if (ScoreCounter.scoreValue > 200)
        {
            slider.GetComponent<ProgressBar>().IncrementProgress(0.20f);
            Currency.currencyValue += 10;
            PlayerPrefs.SetInt("Currency", PlayerPrefs.GetInt("Currency") + Currency.currencyValue);
        }
        if (ScoreCounter.scoreValue > 300)
        {
            slider.GetComponent<ProgressBar>().IncrementProgress(0.30f);
            Currency.currencyValue += 15;
            PlayerPrefs.SetInt("Currency", PlayerPrefs.GetInt("Currency") + Currency.currencyValue);
        }
        if (ScoreCounter.scoreValue > 800)
        {
            slider.GetComponent<ProgressBar>().IncrementProgress(0.40f);
            Currency.currencyValue += 20;
            PlayerPrefs.SetInt("Currency", PlayerPrefs.GetInt("Currency") + Currency.currencyValue);
        }
        if (ScoreCounter.scoreValue > 1000)
        {
            slider.GetComponent<ProgressBar>().IncrementProgress(0.60f);
            Currency.currencyValue += 25;
            PlayerPrefs.SetInt("Currency", PlayerPrefs.GetInt("Currency") + Currency.currencyValue);
        }
        if (ScoreCounter.scoreValue > 1300)
        {
            slider.GetComponent<ProgressBar>().IncrementProgress(0.70f);
            Currency.currencyValue += 30;
            PlayerPrefs.SetInt("Currency", PlayerPrefs.GetInt("Currency") + Currency.currencyValue);
        }
        if (ScoreCounter.scoreValue > 1600)
        {
            slider.GetComponent<ProgressBar>().IncrementProgress(0.80f);
            Currency.currencyValue += 35;
            PlayerPrefs.SetInt("Currency", PlayerPrefs.GetInt("Currency") + Currency.currencyValue);
        }
        if (ScoreCounter.scoreValue > 3000)
        {
            slider.GetComponent<ProgressBar>().IncrementProgress(1f);
            Currency.currencyValue += 40;
            PlayerPrefs.SetInt("Currency", PlayerPrefs.GetInt("Currency") + Currency.currencyValue);
        }
    }

}
