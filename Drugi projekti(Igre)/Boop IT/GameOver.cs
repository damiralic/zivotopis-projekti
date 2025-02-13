using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class GameOver : MonoBehaviour
{
    public Animator anim;
    public GameObject panel;
    public AudioSource audioData;
    void OnTriggerEnter2D(Collider2D other)
    {
        if(other.tag == "Hitbox")
        {
            StartCoroutine(LoadScene());
            if (ScoreCounter.scoreValue > PlayerPrefs.GetInt("HighScore"))
            {
                PlayerPrefs.SetInt("HighScore", ScoreCounter.scoreValue);
            }
            audioData.Play(0);
        }
    }
    public void Restart()
    {
      SceneManager.LoadScene("SampleScene");
    }
    public void Menu()
    {
        SceneManager.LoadScene("MainMenu");
    }
    public void About()
    {
        SceneManager.LoadScene("About");
    }
    public void Lvl()
    {
        SceneManager.LoadScene("LevelSelect");
    }
    public void Medium()
    {
        SceneManager.LoadScene("Medium");
    }
    public void Advanced()
    {
        SceneManager.LoadScene("Advanced");
    }
    public void Subscribe()
    {
        Application.OpenURL("https://www.youtube.com/channel/UCPvi8ygWMGe72lqjY2GFYFQ?sub_confirmation=1");
    }

    IEnumerator LoadScene()
    {
        anim.SetTrigger("end");
        yield return new WaitForSeconds(0.5f);
        SceneManager.LoadScene("GameOver");
    }
}
