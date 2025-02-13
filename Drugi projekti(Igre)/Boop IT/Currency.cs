using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class Currency : MonoBehaviour
{
    public static int currencyValue = 0;
    Text currency;
    public Text currencyText;
    void Start()
    {
        currency = GetComponent<Text>();
        currencyText.text = PlayerPrefs.GetInt("Currency").ToString();
    }

    // Update is called once per frame
    void Update()
    {
        currency.text = "" + currencyValue;
    }

}
