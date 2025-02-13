using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class IsClicked : MonoBehaviour
{
    public GameObject particles;
    public Transform Player;
    public AudioSource audioData;
    void OnMouseDown()
    {
        ScoreCounter.scoreValue += Random.Range(1, 10);
        Instantiate(particles, Player.transform.position, Quaternion.identity);
        audioData.Play(0);
        Destroy(gameObject);
        
    }

}
